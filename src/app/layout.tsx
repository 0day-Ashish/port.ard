import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const clashGrotesk = localFont({
  src: "../../public/fonts/ClashGrotesk-Variable.ttf",
  variable: "--font-clash-grotesk",
});

export const metadata: Metadata = {
  title: "^-^ ard.dev ^-^",
  description: "designed & developed by ard.dev^-^",
};

import CustomCursor from "@/components/CustomCursor";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${clashGrotesk.variable} antialiased`}
      >
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
