import AllProfilePins from "@/components/profile/all-profile-pins";
import UserFollowUnfollow from "@/components/profile/user-follow-unfollow";
import { authOptions } from "@/lib/authOptions";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import { IUserDetails } from "@/types/types";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";
import type { Metadata } from "next";

// fetch user
async function getUser(userId: string) {
  const res = await fetch(`${process.env.BASE_URL}/api/profile/${userId}`);
  const user = await res?.json();
  return user;
}

export default async function Profiles({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const userId = (await params).id;

  const session = await getServerSession(authOptions);
  const currentUser = session?.user?.id as string;

  const user: IUserDetails = await getUser(userId);

  if (!user || !user._id || !userId) return notFound();

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

      <div className="mt-20 max-w-5xl mx-auto">
        <AllProfilePins userId={user._id} />
      </div>
    </div>
  );
}

// SSG Paths
export async function generateStaticParams() {
  await connectToDatabase();
  const users = await User.find();

  return users.map((user) => ({
    id: user._id.toString(),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const id = (await params).id;
  const res = await fetch(
    `${process.env.BASE_URL}/api/profile/${id.toString()}`
  );
  const user = await res.json();

  return {
    title: `${user.name}`,
    description: `See pins created by ${user.name}. Follow for more creative content.`,
    openGraph: {
      title: `${user.name}'s Profile`,
      description: `Check out the profile of ${user.name} on Preronaa.`,
      url: `/user/${id}`,
      siteName: "Preronaa",
      type: "profile",
    },
  };
}
