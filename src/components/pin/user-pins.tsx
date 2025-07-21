import { IUserPin } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

async function UserPins({
  userId,
  pinType,
}: {
  userId: string;
  pinType?: string;
}) {
  const res = await fetch(
    `${process.env.BASE_URL}/api/profile/${userId}/pins?category=${pinType}`,
    { method: "GET" }
  );
  const data: IUserPin[] = await res?.json();

  return (
    <div>
      {data && data.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 w-full">
          {data.map((pin, idx) => (
            <div key={idx}>
              <div className="relative aspect-[16/9] w-full">
                <Link href={`/pin/${pin._id}`}>
                  <Image
                    alt="pin photo"
                    src={pin.photoUrl}
                    fill
                    loading="lazy"
                    className="object-cover rounded-md"
                  />
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="font-medium ml-1.5 ">
          {pinType ? "No bookmarks added yet" : "No pins added yet"}
        </p>
      )}
    </div>
  );
}

export default UserPins;
