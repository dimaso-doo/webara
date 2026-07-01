import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ScrollReveal } from "@/components/ScrollReveal";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap"
});

export const metadata: Metadata = {
  title: "Webara | AI Website Creation",
  description: "Webara builds modern websites with artificial intelligence, design, and human strategy."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ScrollReveal />
        {children}
      </body>
    </html>
  );
}
