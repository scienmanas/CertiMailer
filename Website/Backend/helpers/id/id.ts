import { createCanvas, Image } from "canvas";
import { TextPosition } from "../../lib/definitions";

interface GenerateIdParams {
  template: Image;
  textPosition: TextPosition[];
  fontSize: number;
  fontFamily: string;
  fontColor: string;
  id: string | null;
}

export function generateId({
  template,
  textPosition,
  fontSize,
  fontFamily,
  fontColor,
  id,
}: GenerateIdParams) {
  // Create a canvas
  const canvas = createCanvas(template.width, template.height);
  const ctx = canvas.getContext("2d");

  // Draw on the template - ctx
  ctx.drawImage(template, 0, 0);

  // Configure text settings
  ctx.font = `${fontSize}px "${fontFamily}"`;
  ctx.fillStyle = fontColor;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Draw text at each specified position, if no text it fill skip
  textPosition.forEach(({ text, xPercent, yPercent }: TextPosition) => {
    if (text && text.trim() !== "") {
      const xPos = (xPercent / 100) * template.width;
      const yPos = (yPercent / 100) * template.height;
      ctx.fillText(text.toString(), xPos, yPos);
    }
  });

  // if id is passee i.e. it is not null then draw it
  if (id) {
    ctx.font = `bold ${fontSize}px "${fontFamily}"`;
    ctx.textAlign = "start";
    ctx.textBaseline = "bottom";
    const idToPrint = `Id: ${id}`;
    ctx.fillText(idToPrint.toString(), 10, template.height - 10);
  }

  return canvas.toBuffer("image/png");
}
