import "./globals.css";
import { Inter } from "next/font/google";
import React from "react";
import { changeTheme } from "@/global/global-functions";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Jack Sanders",
  description: "Jack Sanders' Portfolio Site",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-colour-background dark:bg-colour-background-dark text-on-background 
                        dark:text-on-background-dark`}
      >
        {children}
      </body>
    </html>
  );
}
