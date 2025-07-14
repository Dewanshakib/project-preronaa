import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/navbar";
import SessionWrapper from "@/components/auth/session-provider";
import { Toaster } from "@/components/ui/sonner";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Preronaa",
  description: "Preronaa app where you can share your pins and ideas",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` ${geistMono.variable} antialiased px-4 py-2`}>
        <SessionWrapper>
          <header className="sticky top-0">
            <Navbar />
          </header>
          {children}
          <Toaster />
        </SessionWrapper>
      </body>
    </html>
  );
}
