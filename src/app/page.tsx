import Pins from "@/components/pin/pins";
import React, { Suspense } from "react";

export default async function Home() {
  const res = await fetch(`${process.env.BASE_URL}/api/pin/all`);
  const data = await res?.json();

  // console.log(data);

  return (
    <div className="p-4">
      <Suspense fallback={<h1 className="text-2xl font-bold text-center">Loading...</h1>}>
        <Pins pins={data}/>
      </Suspense>
    </div>
  );
}
