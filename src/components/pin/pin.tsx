import { IPinDetails } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Pin({ pin }: { pin: IPinDetails }) {
  // console.log(pin)

  return (
    <div className="w-full h-auto">
      <Link href={`/pin/${pin._id}`}>
        <div className="w-full h-80 relative">
          <Image
            fill
            src={pin.photoUrl}
            alt="pin photo"
            priority
            className="object-cover rounded hover:opacity-90"
            sizes="(max-width:120px)"
          />
        </div>
      </Link>
    </div>
  );
}

export default Pin;
