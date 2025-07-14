import Pins from "@/components/pin/pins";
import React from "react";

export default async function Home() {
  const res = await fetch(`${process.env.BASE_URL}/api/pin/all`);
  const data = await res?.json();

  // console.log(data);

  return (
    <div className="p-4">
      <Pins pins={data}/>
    </div>
  );
}
