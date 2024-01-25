import "./globals.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import React from "react";
import { Providers } from "@/app/providers";
import { Analytics } from "@vercel/analytics/react";
import Navbar from "@/components/Navbar";
import { fontSans } from "@/app/fonts";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Footer from "@/components/Footer";

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
                      ${fontSans.className}`}
      >
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
