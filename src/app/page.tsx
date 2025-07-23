import Pins from "@/components/pin/pins";
import { Metadata } from "next";
import React from "react";

export default async function Home() {
  return (
    <div className="p-4">
      <Pins />
    </div>
  );
}

export const metadata:Metadata = {
  title: "Home • Discover & Share Creative Ideas",
  description: "Explore trending pins and creative content from across the globe. Share your ideas with the Preronaa community.",
  openGraph: {
    title: "Preronaa - Home",
    description: "Discover and save creative pins, designs, and inspiration.",
    url: "/",
    siteName: "Preronaa",
    type: "website",
  },
};
