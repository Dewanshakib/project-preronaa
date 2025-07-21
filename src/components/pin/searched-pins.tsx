import { IPinDetails } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function SearchedPins({ pins }: { pins: IPinDetails[] }) {
  // console.log(pins);
  return (
    <div className="mt-5 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {pins && pins.length ? (
          pins.map((pin: IPinDetails) => (
            <div key={pin._id} className="">
              <Link href={`/pin/${pin._id}`}>
                <section className="relative w-full aspect-[16/9]">
                  <Image
                    src={pin.photoUrl}
                    fill
                    alt="pin photo"
                    className="object-cover rounded-md"
                  />
                </section>
              </Link>
            </div>
          ))
        ) : (
          <h1 className="text-2xl md:text-4xl font-medium  w-full mx-auto text-red-500">
            No pin found
          </h1>
        )}

      </div>
    </div>
  );
}

export default SearchedPins;
