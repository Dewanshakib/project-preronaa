import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/navbar/navbar";
import SessionWrapper from "@/components/auth/session-provider";
import { Toaster } from "@/components/ui/sonner";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.BASE_URL!), // Your domain here

  title: {
    default: "Preronaa",
    template: "%s • Preronaa",
  },

  description:
    "Preronaa is your creative space to discover, share, and save ideas that inspire. From design to lifestyle, explore it all here.",

  keywords: [
    "Preronaa",
    "Pinterest alternative",
    "Inspiration board",
    "Creative ideas",
    "Design sharing",
    "Social media pins",
  ],

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },

  openGraph: {
    title: "Preronaa",
    description:
      "Discover and share the world’s most inspiring visuals. Join the Preronaa community today!",
    url: `${process.env.BASE_URL!}`,
    siteName: "Preronaa",
    images: [
      {
        url: "./preronaa_logo.png", // Make this real later
        width: 1200,
        height: 630,
        alt: "Preronaa - Discover and Share Ideas",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` ${geistMono.variable} antialiased px-4`}>
        <SessionWrapper>
          <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-md rounded-b-md  py-3 px-4">
            <Navbar />
          </header>
          <div className="py-2">{children}</div>
          <Toaster />
        </SessionWrapper>
      </body>
    </html>
  );
}
