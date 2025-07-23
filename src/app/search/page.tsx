import SearchedPinList from "@/components/pin/searchd-pin-list";
import { Metadata } from "next";
import React, { Suspense } from "react";

export default function Search() {
  return (
    <div>
      <Suspense>
        <SearchedPinList />
      </Suspense>
    </div>
  );
}

export const metadata: Metadata = {
  title: "Search Pins",
  description:
    "Find creative pins, users, and boards that match your inspiration.",
  openGraph: {
    title: "Search | Preronaa",
    description: "Explore content shared by the Preronaa community.",
    url: "/search",
    siteName: "Preronaa",
    type: "website",
  },
};
