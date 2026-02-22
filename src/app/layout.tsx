import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"

const clashGrotesk = localFont({
  src: "../../public/fonts/ClashGrotesk-Variable.ttf",
  variable: "--font-clash-grotesk",
});

export const metadata: Metadata = {
  title: "^-^ ard.dev ^-^",
  description: "designed & developed by ard.dev",
  icons: {
    icon: "/assets/favicon.jpg",
  },
};

import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import AutoMusic from "@/components/AutoMusic";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body
        className={`${clashGrotesk.variable} antialiased`}
      >
        <SmoothScroll>
          <CustomCursor />
          <AutoMusic />
          <SpeedInsights/>
          <Analytics/>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
