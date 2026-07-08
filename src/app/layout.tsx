import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"
import Script from "next/script";

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


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Ashish Ranjan Das",
              "alternateName": "arddev",
              "url": "https://arddev.in",
              "jobTitle": "Full Stack Designer & Developer",
              "sameAs": [
                "https://github.com/0day-Ashish",
                "https://linkedin.com/in/arddev/",
                "https://instagram.com/ashishhikr"
              ]
            }),
          }}
        />
      </head>
      <body
        className={`${clashGrotesk.variable} antialiased`}
      >
        <Script
          src="https://louisabraham.github.io/nekojs/neko.js"
          data-autostart
          strategy="afterInteractive"
        />
        <SmoothScroll>
          <CustomCursor />

          <SpeedInsights />
          <Analytics />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
