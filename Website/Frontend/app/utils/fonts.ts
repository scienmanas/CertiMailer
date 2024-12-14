import { Comic_Neue } from "next/font/google";
import { Fira_Sans } from "next/font/google";

export const comicNeueFont = Comic_Neue({
  subsets: ["latin"],
  weight: "700",
  display: "swap",
});

export const firaSansFont = Fira_Sans({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});
