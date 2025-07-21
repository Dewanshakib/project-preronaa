import { getAllPins } from "@/actions";
import Pins from "@/components/pin/pins";
import React, { Suspense } from "react";

export default async function Home() {
 
  return (
    <div className="p-4">
      <Suspense
        fallback={
          <h1 className="text-2xl font-bold text-center">Loading...</h1>
        }
      >
        <Pins />
      </Suspense>
    </div>
  );
}
