import { createCanvas, Image } from "canvas";
import { TextPosition } from "../../lib/definitions";

interface GenerateIdParams {
  template: Image;
  textPositions: TextPosition[];
  fontSize: number;
  fontFamily: string;
  fontColor: string;
}

export function generateId({
  template,
  textPositions,
  fontSize,
  fontFamily,
  fontColor,
}: GenerateIdParams) {
  // Create a canvas
  const canvas = createCanvas(template.width, template.height);
  const ctx = canvas.getContext("2d");

  // Draw on the template - ctx
  ctx.drawImage(template, 0, 0);

  // Configure text settings
  ctx.font = `${fontSize}px "${fontFamily}"`;
  ctx.fillStyle = fontColor
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Draw text at each specified position
  textPositions.forEach(({ text, xPercent, yPercent }: TextPosition) => {
    if (text && text.trim() !== "") {
      const xPos = (xPercent / 100) * template.width;
      const yPos = (yPercent / 100) * template.height;
      ctx.fillText(text.toString(), xPos, yPos);
    }
  });

  return canvas.toBuffer("image/png");
}
