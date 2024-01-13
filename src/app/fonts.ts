/**
 * Helper constants for fonts
 */

import { Open_Sans, DM_Serif_Display, Courier_Prime } from "next/font/google";
import { NextFont } from "next/dist/compiled/@next/font";

export const fontSerif: NextFont = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  fallback: ["serif"]
});

export const fontSans: NextFont = Open_Sans({
  subsets: ["latin"],
  weight: ["400"],
  fallback: ["sans-serif"]
});

export const fontMono: NextFont = Courier_Prime({
  subsets: ["latin"],
  weight: ["400"],
  fallback: ["mono"]
});
