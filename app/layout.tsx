import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const myFont = localFont({ src: "./fonts/RoobertTRIALVF.ttf", display: "swap" });

export const metadata: Metadata = {
  title: "Skintrinsic Homepage",
  description: "A.I. Assisted Skincare",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${myFont.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
