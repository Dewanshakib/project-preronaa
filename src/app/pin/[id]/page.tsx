import DeletePin from "@/components/pin/delete-pin";
import UserDislikeButton from "@/components/pin/pin-dislike";
import UserLikeButton from "@/components/pin/pin-like";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { authOptions } from "@/lib/authOptions";
import { IPinDetails } from "@/types/types";
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
  const id = (await params).id;

  const res = await fetch(`${process.env.BASE_URL}/api/pin/${id}`);
  const pin: IPinDetails = await res?.json();
  const session = await getServerSession(authOptions);
  const currentUser = session?.user?.id as string;

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
              <Link href={`/pin/edit/${id}`}>
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
            {/* like or dislike btn */}
            <div className="flex items-center flex-col">
              {pin.like.includes(currentUser) ? (
                <UserLikeButton userId={currentUser} pinId={pin._id} />
              ) : (
                <UserDislikeButton userId={currentUser} pinId={pin._id} />
              )}
              <p className="text-sm font-medium">{pin.like.length}</p>
            </div>

            {/* comment btn */}
            <Button variant={"ghost"}>
              <MessageCircle className="size-5.5" />
            </Button>
          </div>

          {/* bookmark btn */}
          <Button variant={"ghost"}>
            <Bookmark className="size-5.5" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
