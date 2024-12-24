import { registerFont } from "canvas";
import path from "path";

interface FontConfig {
  family: string;
  weight?: string;
  style?: string;
  path: string;
}

const FONT_DIR = path.join(process.cwd(), "misc/fonts");

const fonts: FontConfig[] = [
  {
    family: "Arial",
    path: path.join(FONT_DIR, "Arial.ttf"),
  },
  {
    family: "Courier",
    path: path.join(FONT_DIR, "Courier.ttf"),
  },
  {
    family: "Times New Roman",
    path: path.join(FONT_DIR, "Times New Roman.ttf"),
  },
  {
    family: "Fira Sans",
    path: path.join(FONT_DIR, "Fira Sans.ttf"),
  },
];

export function registerFonts() {
  fonts.forEach((font) => {
    registerFont(font.path, {
      family: font.family,
      weight: font.weight,
      style: font.style,
    });
  });
}

