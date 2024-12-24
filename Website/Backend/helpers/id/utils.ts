import { FieldMapping, TextPosition } from "../../lib/definitions";
import PDFDocument from "pdfkit";
import sharp from "sharp";

export function mapCSVToTextPositions(
  row: Record<string, string>,
  fields: FieldMapping[]
): TextPosition[] {
  return fields.map((field) => ({
    text: row[field.mapping],
    xPercent: field.point.xPercent,
    yPercent: field.point.yPercent,
  }));
}

// Helper function to convert PNG buffer to PDF buffer
export async function convertPNGtoPDF(pngBuffer: Buffer): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      // First get the metadata
      sharp(pngBuffer)
        .metadata()
        .then((metadata) => {
          const { width = 0, height = 0 } = metadata;

          const pdfDoc = new PDFDocument({
            autoFirstPage: false,
          });

          const chunks: Buffer[] = [];

          pdfDoc.on("data", (chunk) => chunks.push(chunk));
          pdfDoc.on("end", () => resolve(Buffer.concat(chunks)));

          // Add a page with the correct dimensions
          pdfDoc.addPage({
            size: [width, height],
          });

          // Add the PNG image
          pdfDoc.image(pngBuffer, 0, 0, {
            width: width,
            height: height,
          });

          pdfDoc.end();
        })
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
}
