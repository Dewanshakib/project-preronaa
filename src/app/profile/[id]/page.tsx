import UserPins from "@/components/pin/user-pins";
import UserFollowUnfollow from "@/components/profile/user-follow-unfollow";
import { authOptions } from "@/lib/authOptions";
import { IUserDetails } from "@/types/types";
import { getServerSession } from "next-auth";
import Image from "next/image";
import React, { Suspense } from "react";

export default async function Profiles({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const userId = (await params).id;
  const res = await fetch(`${process.env.BASE_URL}/api/profile/${userId}`);
  const user: IUserDetails = await res?.json();
  const session = await getServerSession(authOptions);
  const currentUser = session?.user?.id as string;

  // console.log(user.avater)

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

          <UserFollowUnfollow
            userId={userId}
            currentUser={currentUser}
            followInfo={user.follower.includes(currentUser)}
          />
        </div>
      </div>

      {/* user pins */}
      <div className="mt-20 max-w-5xl mx-auto">
        <Suspense
          fallback={
            <h1 className="text-2xl font-semibold text-center mt-30">
              Loading...
            </h1>
          }
        >
          <UserPins userId={userId} />
        </Suspense>
      </div>
    </div>
  );
}

