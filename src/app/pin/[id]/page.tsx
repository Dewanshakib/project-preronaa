import DeletePin from "@/components/pin/delete-pin";
import PinBookmark from "@/components/pin/pin-bookmark";
import UserLikeDislikeButton from "@/components/pin/pin-like-dislike-btn";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { authOptions } from "@/lib/authOptions";
import { IPinDetails, IUserDetails } from "@/types/types";
import { Bookmark, Heart, MessageCircle, SquarePen } from "lucide-react";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function Pin({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const pinId = (await params).id;

  // fetching pin
  const res = await fetch(`${process.env.BASE_URL}/api/pin/${pinId}`);
  const pin: IPinDetails = await res?.json();

  // getting session
  const session = await getServerSession(authOptions);
  const currentUser = session?.user?.id as string;

  // fetching user info
  const resUser = await fetch(
    `${process.env.BASE_URL}/api/profile/${currentUser}`
  );
  const user: IUserDetails = await resUser?.json();

  // console.log(user)

  return (
    <Card className="w-full max-w-4xl mx-auto mt-10 flex flex-col">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="">
            <h1 className="font-medium text-xl">{pin.caption}</h1>
            <div className="flex items-center gap-1.5 mt-2">
              <div className="w-6 h-6 relative rounded-full overflow-hidden">
                {pin.creator?.avater ? (
                  <Image
                    fill
                    className="object-cover"
                    alt="user photo"
                    src={pin.creator?.avater}
                    sizes="(max-width:20px)"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 rounded-full grid place-items-center">
                    <p className="text-xs font-bold">
                      {pin.creator.name?.charAt(0)}
                    </p>
                  </div>
                )}
              </div>
              <Link
                href={`/profile/${pin.creator._id}`}
                className="tex-sm text-gray-600 font-medium"
              >
                {pin.creator.username}
              </Link>
            </div>
          </div>
          {pin.creator._id === currentUser && (
            <div className="flex items-center gap-3">
              <Link href={`/pin/edit/${pinId}`}>
                <Button variant={"outline"}>
                  <SquarePen className="size-4" />
                </Button>
              </Link>
              <DeletePin pinId={pin._id} />
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative w-full aspect-[16/9]">
          <Image
            src={pin.photoUrl}
            alt="Awesome Image"
            fill
            className="object-cover rounded-lg"
            priority
          />
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex items-start justify-between gap-3 w-full">
          <div className="flex gap-1 items-start">
            {/* like and dislike btn */}
            <div className="flex items-center flex-col">
              <UserLikeDislikeButton
                userId={currentUser}
                pinId={pin._id}
                likeInfo={pin.like.includes(currentUser)}
              />
              <p className="text-sm font-medium">{pin.like.length}</p>
            </div>

            {/* comment btn */}
            <Button variant={"ghost"}>
              <MessageCircle className="size-5.5" />
            </Button>
          </div>

          {/* bookmark btn */}
          <PinBookmark
            userId={currentUser}
            pinId={pin._id}
            bookmarkInfo={user.bookmarks.includes(pinId)}
          />
        </div>
      </CardFooter>
    </Card>
  );
}
