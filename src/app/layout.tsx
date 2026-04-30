import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import InteractiveBackground from "@/components/InteractiveBackground";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Portfolio | Scrollytelling Experience",
  description: "A high-end personal portfolio built with Next.js and Framer Motion.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <Navbar />
        <InteractiveBackground />
        {children}
      </body>
    </html>
  );
}
