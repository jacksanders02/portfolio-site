/**
 * Helper constants for fonts
 */

import {
  DM_Serif_Display,
  Courier_Prime,
  DM_Sans,
  DM_Mono,
} from "next/font/google";
import { NextFont } from "next/dist/compiled/@next/font";

export const fontSerif: NextFont = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  fallback: ["serif"],
});

export const fontSans: NextFont = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  fallback: ["sans-serif"],
});

export const fontMono: NextFont = DM_Mono({
  subsets: ["latin"],
  weight: ["400"],
  fallback: ["mono"],
});
