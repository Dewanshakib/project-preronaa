import { Button } from "@/components/ui/button";
import { SquarePen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function Profile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/profile/${id}`
  );

  const user = await res?.json();
  // console.log(data);

  return (
    <div className="w-full mt-20 ">
      <div className="max-w-md w-full mx-auto md:flex-row items-center flex flex-col">
        {/* user avater */}
        <div className="w-40 h-40 mx-auto">
          {user.image ? (
            <Image
              fill
              className="object-contain"
              alt="user photo"
              src={user.image}
            />
          ) : (
            <div className="w-full h-full bg-gray-200 rounded-full grid place-items-center">
              <p className="text-5xl font-bold">{user.username.charAt(0)}</p>
            </div>
          )}
        </div>

        {/* user info */}
        <div className="">
          <p className="text-2xl font-bold">{user.username}</p>
          <p className="text-lg font-medium text-black/80">{user.email}</p>
          <div className="flex items-center flex-row gap-3 font-medium text-sm mt-1.5">
            <p>Followers: {user.follower.length}</p>
            <p>Following: {user.following.length}</p>
          </div>
          <Button variant={"outline"} className="mt-4">
            <Link
              className="flex items-center gap-1.5"
              href={`/profile/edit/${user._id.toString()}`}
            >
              Edit Profile <SquarePen />{" "}
            </Link>
          </Button>
        </div>
      </div>

      {/* user pins */}
      <div className="mt-10">User pins</div>
    </div>
  );
}
