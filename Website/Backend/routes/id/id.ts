import { Router, Request, Response } from "express";
import { CSVData, FieldMapping, TextPosition } from "../../lib/definitions";
import { upload } from "../../config/multer";
import { parseCSV } from "../../helpers/parsers/parsers";
import { generateId } from "../../helpers/id/id";
import { mapCSVToTextPositions, convertPNGtoPDF } from "../../helpers/id/utils";
import { loadImage } from "canvas";
import fs from "fs";
import JSZip from "jszip";
import path from "path";

// Initialise the router
const router = Router();

router.post(
  "/generate",
  upload.fields([
    { name: "template", maxCount: 1 },
    { name: "csvData", maxCount: 1 },
  ]),
  async (req: Request, res: Response) => {
    try {
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      const fields = JSON.parse(req.body.fields) as FieldMapping[];
      const fontSize = parseInt(req.body.fontSize);
      const fontFamily = req.body.fontFamily;
      const fontColor = req.body.fontColor;
      const generationType = req.body.generationType;

      // Check if all required fields are present
      if (
        !files.template ||
        !files.csvData ||
        !fields.length ||
        !fontSize ||
        !fontFamily ||
        !fontColor
      )
        return res.status(400).json({ message: "Invalid request" });

      // Get the paths of the uploaded files
      const templatePath = files.template[0].path;
      const csvPath = files.csvData[0].path;

      // Read and parse CSV using the promisified function & load the template image
      const csvContent = fs.readFileSync(csvPath, "utf-8");
      const csvData: CSVData = (await parseCSV(csvContent)) as CSVData;
      const templateImage = await loadImage(templatePath);

      // Check if the CSV has enough rows
      if (csvData.rows.length < 1)
        return res
          .status(400)
          .json({ message: "CSV must have at least one row" });

      // Initialise zip function
      const zip = new JSZip();

      // Process each row
      for (let i = 0; i < csvData.rows.length; i++) {
        const textPositions: TextPosition[] = mapCSVToTextPositions(
          csvData.rows[i],
          fields
        );
        const pngIdBuffer = generateId({
          textPositions: textPositions,
          template: templateImage,
          fontSize: fontSize,
          fontFamily: fontFamily,
          fontColor: fontColor,
        });

        if (generationType === "PDF") {
          // Convert PNG to PDF
          const pdfBuffer = await convertPNGtoPDF(pngIdBuffer);
          zip.file(`id_${i + 1}.pdf`, pdfBuffer);
        } else if (generationType === "PNG")
          zip.file(`id_${i + 1}.png`, pngIdBuffer);
        else
          return res.status(400).json({ message: "Invalid generation type" });
      }

      // Generate zip file & save it
      const zipBuffer = await zip.generateAsync({ type: "nodebuffer" });
      const zipPath = path.join("uploads", `ids-${Date.now()}.zip`);
      fs.writeFileSync(zipPath, zipBuffer);

      // Send zip file and set headers
      res.setHeader("Content-Type", "application/zip");
      res.setHeader("Content-Disposition", "attachment; filename=download.zip");
      res.download(zipPath, "ids.zip", (err) => {
        if (err) {
          console.error("Error sending file:", err);
        }
        // Clean up the zip file
        fs.unlinkSync(zipPath);
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    } finally {
      // Clean up any uploaded files in cas/*  */e of error
      if (req.files) {
        const files = req.files as {
          [fieldname: string]: Express.Multer.File[];
        };
        Object.values(files)
          .flat()
          .forEach((file) => {
            if (fs.existsSync(file.path)) {
              fs.unlinkSync(file.path);
            }
          });
      }
    }
  }
);

export default router;
