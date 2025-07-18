import { IPinDetails } from "@/types/types";
import React from "react";
import PinCard from "./pin-card";

function Pins({ pins }: { pins: Array<IPinDetails> }) {


  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {pins && pins.length > 0 ? (
          pins.map((pin, index) => <PinCard key={index} pin={pin} />)
        ) : (
          <h1>No pins to show</h1>
        )}
      </div>
    </div>
  );
}

export default Pins;
