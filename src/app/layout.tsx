import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/Navbar";
import Cursor from "@/components/common/Cursor";
import Footer from "@/components/common/Footer";
import SessionProvider from "@/components/common/SessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Unstop Igniters Club RCCIIT",
  description: "Official Business Club of RCC Institute of Information Technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <Cursor />
        {children}
        <Footer />
        <SessionProvider />
      </body>
    </html>
  );
}
