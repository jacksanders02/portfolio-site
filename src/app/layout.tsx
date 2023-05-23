import "./globals.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import React from "react";
import { Providers } from "@/app/providers";
import { Analytics } from "@vercel/analytics/react";
import Navbar from "@/components/navbar";
import ScrollIndicator from "@/components/scrollIndicator";

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
        className="bg-colour-background dark:bg-colour-background-dark
                      text-on-background dark:text-on-background-dark"
      >
        <Providers>
          <Navbar />
          {children}
          <div className={"fixed bottom-0 p-8"}>
            <ScrollIndicator />
          </div>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
