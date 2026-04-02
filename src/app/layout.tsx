import type { Metadata } from "next";
import { plusJakartaSans, fragmentMono } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Muthu Krishnan | Senior Frontend Developer",
  description:
    "Crafting Seamless Digital Experiences for Modern Brands. Senior Frontend Developer & UI Engineer based in Bengaluru.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${fragmentMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
