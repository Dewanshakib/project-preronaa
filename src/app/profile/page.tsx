import UserPins from "@/components/pin/user-pins";
import BookmarkedPins from "@/components/profile/bookmarked-pins";
import { Button } from "@/components/ui/button";
import { authOptions } from "@/lib/authOptions";
import { IUserDetails } from "@/types/types";
import { SquarePen } from "lucide-react";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function Profile() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id as string;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/profile/${userId}`
  );

  const user: IUserDetails = await res?.json();

  return (
    <div className="w-full mt-20 ">
      <div className="max-w-md w-full mx-auto md:flex-row items-center flex flex-col">
        {/* user avater */}
        <div className="w-40 h-40 mx-auto relative rounded-full overflow-hidden">
          {user?.avater ? (
            <Image
              fill
              className="object-cover"
              alt="user photo"
              src={user.avater}
              sizes="(max-width:160px)"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 rounded-full grid place-items-center">
              <p className="text-5xl font-bold">{user?.name?.charAt(0)}</p>
            </div>
          )}
        </div>

        {/* user info */}
        <div className="flex items-center md:items-start flex-col mt-5 md:mt-0">
          <p className="text-2xl font-bold">{user?.name}</p>
          <p className="text-lg font-medium text-black/80">{user?.email}</p>
          <div className="flex items-center flex-row gap-3 font-medium text-sm mt-1.5">
            <p>Followers: {user?.follower?.length}</p>
            <p>Following: {user?.following?.length}</p>
          </div>
          {user?.bio && (
            <div className="mt-1">
              <p className="font-medium">{user?.bio}</p>
            </div>
          )}
          <Button variant={"outline"} className="mt-4">
            <Link className="flex items-center gap-1.5" href={"/profile/edit"}>
              Edit Profile <SquarePen />
            </Link>
          </Button>
        </div>
      </div>

      {/* user pins */}
      <div className="mt-20 max-w-5xl mx-auto">
        <UserPins userId={userId} />
        <BookmarkedPins/>
      </div>
    </div>
  );
}
