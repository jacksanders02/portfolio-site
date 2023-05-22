import { Open_Sans, DM_Serif_Display, Courier_Prime } from "next/font/google";

export const fontSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
});

export const fontSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400"],
});

export const fontMono = Courier_Prime({
  subsets: ["latin"],
  weight: ["400"],
});
