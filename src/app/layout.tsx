import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/navbar";
import { Toaster } from "@/components/ui/sonner";
import SessionWrapper from "@/components/auth/session-provider";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pinterest",
  description: "Pinterest clone app",
};

export default function RootLayout({
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
          <main>
            {children}
            <Toaster />
          </main>
        </SessionWrapper>
      </body>
    </html>
  );
}
