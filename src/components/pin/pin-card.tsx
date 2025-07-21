import { IPinDetails } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function PinCard({ pins }: { pins: IPinDetails[] }) {

  console.log(pins)

  return (
    <div className="w-full h-auto">
      {pins && pins.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {pins.map((pin) => (
            <div className="" key={pin._id}>
              <Link href={`/pin/${pin._id}`}>
                <div className="w-full relative aspect-[16/9]">
                  <Image
                    fill
                    src={pin.photoUrl}
                    alt="pin photo"
                    loading="lazy"
                    className="object-cover rounded hover:opacity-90"
                    sizes="(max-width:120px)"
                  />
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <h1>No pins added yet</h1>
      )}
    </div>
  );
}

export default PinCard;
