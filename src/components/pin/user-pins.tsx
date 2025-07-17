import { IUserPin } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

async function UserPins({ userId }: { userId: string }) {
  const res = await fetch(
    `${process.env.BASE_URL}/api/profile/${userId}/pins`,
    { method: "GET" }
  );
  const data: IUserPin[] = await res?.json();
  // console.log(data);

  return (
    <div>
      {data && data.length > 0 ? (
        <div>
          {data.map((pin, idx) => (
            <div key={idx}>
              <div className="relative aspect-[16/9] max-w-sm">
                <Link href={`/pin/${pin._id}`}>
                  <Image
                    alt="pin photo"
                    src={pin.photoUrl}
                    fill
                    className="object-cover"
                  />
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No pins added yet</p>
      )}
    </div>
  );
}

export default UserPins;
