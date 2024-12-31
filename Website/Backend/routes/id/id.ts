import { Router, Request, Response } from "express";
import { CSVData, FieldMapping, TextPosition } from "../../lib/definitions";
import { upload } from "../../config/multer";
import { parseCSV } from "../../helpers/parsers/parsers";
import { generateId } from "../../helpers/id/id";
import { mapCSVToTextPosition, convertPNGtoPDF } from "../../helpers/id/utils";
import { sendMail } from "../../helpers/utils/mailer";
import { updateGenerationCount } from "../../helpers/utils/analytics";
import { protectUserRoutes } from "../../middlewares/protectRoutes";
import Event from "../../models/event";
import Id from "../../models/id";
import User from "../../models/user";
import { loadImage } from "canvas";
import fs from "fs";
import JSZip from "jszip";
import path from "path";
import { ObjectId } from "mongoose";

interface CustomRequest extends Request {
  userId?: ObjectId;
}

// Initialise the router
const router = Router();

// Route - 1 : Generate ids/certificates - no login endpoint
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
      const csvData: CSVData = (await parseCSV(csvContent, false)) as CSVData;
      const templateImage = await loadImage(templatePath);

      // Check if the CSV has enough rows
      if (csvData.rows.length < 1)
        return res
          .status(400)
          .json({ message: "CSV must have at least one row" });
      else if (csvData.rows.length > 400)
        return res
          .status(400)
          .json({ message: "CSV must have at most 400 rows" });

      // Initialise zip function
      const zip = new JSZip();

      // Process each row
      for (let i = 0; i < csvData.rows.length; i++) {
        const textPosition: TextPosition[] = mapCSVToTextPosition(
          csvData.rows[i],
          fields
        );

        const pngIdBuffer = generateId({
          textPosition: textPosition,
          template: templateImage,
          fontSize: fontSize,
          fontFamily: fontFamily,
          fontColor: fontColor,
          id: null,
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

      // Update the generation count
      updateGenerationCount({
        total: { number: csvData.rows.length, update: true },
        publicGeneration: { number: csvData.rows.length, update: true },
        loggedInGeneration: { number: 0, update: false },
      });

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

// Route - 2 : Generate ids/certificates - logged in endpoint
router.post(
  "/generate/logged-in",
  protectUserRoutes,
  upload.fields([
    { name: "template", maxCount: 1 },
    { name: "csvData", maxCount: 1 },
  ]),
  async (req: CustomRequest, res: Response) => {
    try {
      // Check if user limit is still left
      const userId = req.userId;
      const user = await User.findById(userId);
      // Check if limit is exceeded
      if (user.totalEvents >= user.maxAllocatedEvents)
        return res.status(400).json({ message: "User limit exceeded" });

      // Get all the data
      const files = req.files as {
        [fieldname: string]: Express.Multer.File[];
      };
      const fields = JSON.parse(req.body.fields) as FieldMapping[];
      const fontSize = parseInt(req.body.fontSize);
      const fontFamily = req.body.fontFamily;
      const fontColor = req.body.fontColor;
      const generationType = req.body.generationType;
      // Event details
      const eventName = req.body.eventName;
      const eventDate = req.body.eventDate;
      const eventType = req.body.eventType;
      const idType = req.body.idType;
      const expiry = req.body.expiry;
      let expiryDate = null;
      if (expiry === "yes") {
        expiryDate = req.body.expiryDate;
      }
      let mailing = req.body?.mailing === "on" ? true : false;

      // Check if all required fields are present
      if (
        !files.template ||
        !files.csvData ||
        !fields.length ||
        !fontSize ||
        !fontFamily ||
        !fontColor ||
        !eventName ||
        !eventDate ||
        !eventType ||
        !idType
      )
        return res.status(400).json({ message: "Invalid request" });

      // Get the paths of the uploaded files
      const templatePath = files.template[0].path;
      const csvPath = files.csvData[0].path;

      // Read and parse CSV using the promisified function & load the template image
      const csvContent = fs.readFileSync(csvPath, "utf-8");
      const csvData: CSVData = (await parseCSV(csvContent, true)) as CSVData;
      const templateImage = await loadImage(templatePath);

      // Check the parsed csv Data ha email at second index or not and name at first index
      if (csvData.headers[1].toLocaleLowerCase() !== "email")
        return res
          .status(400)
          .json({ message: "CSV must have email at second index" });
      if (csvData.headers[0].toLowerCase() !== "name")
        return res
          .status(400)
          .json({ message: "CSV must have name at first index" });

      if (csvData.rows.length < 1)
        // Check if the csv has enough rows
        return res
          .status(400)
          .json({ message: "CSV must have at least one row" });
      else if (csvData.rows.length > 400)
        return res
          .status(400)
          .json({ message: "CSV must have at most 400 rows" });

      // If the mailing is true but it exceeds the limit
      if (mailing && csvData.rows.length > user.AllocatedEmails)
        mailing = false;

      // Initialise zip function
      const zip = new JSZip();

      // Create an event in the database and save the text positions
      const event = await Event.create({
        organizationId: userId,
        eventName: eventName,
        eventDate: eventDate,
        eventType: eventType,
      });

      // Process each row
      for (let i = 0; i < csvData.rows.length; i++) {
        // Get the text positions
        const textPosition: TextPosition[] = mapCSVToTextPosition(
          csvData.rows[i],
          fields
        );

        // Generate new id and save it in the database
        const id = await Id.create({
          organizationId: userId,
          eventId: event._id,
          idType: idType,
          issuedTo: textPosition[0]["text"] || null,
          issuedEmail: csvData.emails?.[i] || null,
          expiryDate: expiry === "yes" ? expiryDate : "Never",
          textPosition: textPosition,
        });

        const pngIdBuffer = generateId({
          textPosition: textPosition,
          template: templateImage,
          fontSize: fontSize,
          fontFamily: fontFamily,
          fontColor: fontColor,
          id: id._id,
        });

        // Process according to the generation type and send email if mailing in the background is enabled
        if (generationType === "PDF") {
          // Convert PNG to PDF
          const pdfBuffer = await convertPNGtoPDF(pngIdBuffer);
          if (mailing === true && csvData.emails?.[i]) {
            // Send email
            await sendMail({
              fromName: user.name,
              toName: textPosition[0]["text"]
                ? textPosition[0]["text"]
                : "User",
              toEmail: csvData.emails[i] as string,
              subject: `Your event Id/Certificate - ${eventName}`,
              message: `Hi there! ✨\n\nThank you for being part of this amazing journey with us! 🤩 We’re thrilled to share that your event ID/Certificate for ${eventName} is ready and attached to this email.\n\nThis is an automated email from the system, but rest assured—it’s handcrafted with care to add a personal touch. Your participation means the world to us, and we can’t wait for you to explore this milestone.\n\nThe unique id of your id/certificate is: ${id._id} and the same can be verified at: https://certimailer.xyz/verify/${id._id}\n\nFeel free to reply if you have questions or need assistance—we’re always here to help! 📬\n\nKeep shining and making a difference! 🌟\n\nWarm regards,\n${user.name}\n📧 Email: ${user.email}\n\n--\n\nTeam CertiMailer\n📧 Email: manas@certimailer.xyz\n🐙 Github: https://github.com/scienmanas/CertiMailer\n🌐 Web: https://certimailer.xyz.xyz`,
              file: {
                originalname: `id_${i + 1}.pdf`,
                buffer: pdfBuffer,
                encoding: "base64",
              } as Express.Multer.File,
            });
          }
          zip.file(`id_${i + 1}.pdf`, pdfBuffer);
        } else if (generationType === "PNG") {
          if (mailing === true && csvData.emails?.[i]) {
            // Send the email
            await sendMail({
              fromName: user.name,
              toName: textPosition[0]["text"]
                ? textPosition[0]["text"]
                : "User",
              toEmail: csvData.emails[i] as string,
              subject: `Your event Id/Certificate - ${eventName}`,
              message: `Hi there! ✨\n\nThank you for being part of this amazing journey with us! 🤩 We’re thrilled to share that your event ID/Certificate for ${eventName} is ready and attached to this email.\n\nThis is an automated email from the system, but rest assured—it’s handcrafted with care to add a personal touch. Your participation means the world to us, and we can’t wait for you to explore this milestone.\n\nThe unique id of your id/certificate is: ${id._id} and the same can be verified at: https://certimailer.xyz/verify/${id._id}\n\nFeel free to reply if you have questions or need assistance—we’re always here to help! 📬\n\nKeep shining and making a difference! 🌟\n\nWarm regards,\n${user.name}\n📧 Email: ${user.email}\n\n--\n\nTeam CertiMailer\n📧 Email: manas@certimailer.xyz\n🐙 Github: https://github.com/scienmanas/CertiMailer\n🌐 Web: https://certimailer.xyz.xyz`,
              file: {
                originalname: `id_${i + 1}.png`,
                buffer: pngIdBuffer,
                encoding: "base64",
              } as Express.Multer.File,
            });
          }
          zip.file(`id_${i + 1}.png`, pngIdBuffer);
        } else
          return res.status(400).json({ message: "Invalid generation type" });
      }

      // Update the generation count
      updateGenerationCount({
        total: { number: csvData.rows.length, update: true },
        publicGeneration: { number: 0, update: false },
        loggedInGeneration: { number: csvData.rows.length, update: true },
      });

      // Generate zip and save it
      const zipBuffer = await zip.generateAsync({ type: "nodebuffer" });
      const zipPath = path.join("uploads", `ids-${Date.now()}.zip`);
      fs.writeFileSync(zipPath, zipBuffer);

      // Send file - email + zip to the admin
      // Send zip by email
      await sendMail({
        fromName: "Admin CertiMailer",
        toName: user.name,
        toEmail: user.email,
        subject: "Generated ids/certificate for event",
        message:
          "Hi there! ✨\n\nThe ids/certificates for the event have been generated and are attached to this email. Please find the zip file attached.\n\nFeel free to reach out if you have any questions or need assistance.\n\nWarm regards,\nCertiMailer\n\n--\n\nManas Poddar\n📧 Email: manas@certimailer.xyz\n🐙 Github: https://github.com/scienmanas/CertiMailer\n🌐 Web: https://certimailer.xyz",
        file: {
          originalname: `ids-${Date.now()}.zip`,
          buffer: zipBuffer,
          encoding: "base64",
        } as Express.Multer.File,
      });
      // Send zip to frontend
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
      return res.status(500).json({ message: "Internal Server Error" });
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

// Route - 3 : Verify the id/certificate
router.post("/verify", async (req: Request, res: Response) => {});

export default router;
