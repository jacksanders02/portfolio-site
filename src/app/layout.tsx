import "./globals.css";
import { Inter } from "next/font/google";
import React from "react";
import { Providers } from "@/app/providers";
import { Analytics } from "@vercel/analytics/react";
import Navbar from "@/components/navbar";

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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`bg-colour-background dark:bg-colour-background-dark 
                      text-on-background dark:text-on-background-dark
                      ${inter.className}`}
      >
        <Providers>
          <Navbar />
          {children}
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
