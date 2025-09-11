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
import { AlertCircle, SquarePen } from "lucide-react";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import AddPinComment from "@/components/pin/add-pin-comment";
import PinComments from "@/components/pin/pin-comments";
import { notFound } from "next/navigation";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import Pin from "@/models/Pin";
import Comment from "@/models/Comment";

// SSG
export async function generateStaticParams() {
  await connectToDatabase();
  const users = await Pin.find();

  return users.map((pin) => ({
    id: pin._id.toString(),
  }));
}

export default async function PinPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // DB connect once
  await connectToDatabase();

  // session
  const session = await getServerSession(authOptions);
  const currentUser = session?.user?.id;
  console.log(currentUser);

  // direct DB queries instead of fetch
  const pin = await Pin.findById(id).populate("creator");
  if (!pin) notFound();

  const comments = await Comment.find({ pin: id }).populate("user");
  const currentUserDetails = currentUser
    ? await User.findById(currentUser)
    : null;

  // console.log(comments)

  return (
    <Card className="w-full max-w-4xl mx-auto mt-10 flex flex-col">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="font-medium text-xl mb-6">{pin.caption}</h1>
            <div className="flex items-center gap-1.5 mt-2">
              <div className="w-6 h-6 relative rounded-full overflow-hidden">
                {pin.creator?.avater ? (
                  <Image
                    fill
                    className="object-cover"
                    alt={`${pin.creator?.username ?? "User"} photo`}
                    loading="lazy"
                    src={pin.creator?.avater}
                    sizes="(max-width:20px)"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 rounded-full grid place-items-center">
                    <p className="text-xs font-bold">
                      {pin.creator?.name?.charAt(0) ?? "?"}
                    </p>
                  </div>
                )}
              </div>
              <Link
                href={`/profile/${pin.creator?._id.toString() ?? ""}`}
                className="text-sm text-gray-600 font-medium"
              >
                {pin.creator?.username ?? "Unknown User"}
              </Link>
            </div>
          </div>

          {session?.user && pin.creator?._id?.toString() === currentUser && (
            <div className="flex items-center gap-3">
              <Link href={`/pin/edit/${id}`}>
                <Button variant="outline">
                  <SquarePen className="size-4" />
                </Button>
              </Link>
              <DeletePin pinId={pin._id.toString()} />
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent>
        <div className="relative w-full aspect-[16/9]">
          <Image
            src={pin.photoUrl}
            alt={pin.caption ?? "Pin image"}
            fill
            className="object-cover rounded-lg"
            loading="lazy"
          />
        </div>

        {session?.user ? (
          <div className="flex items-start justify-between gap-3 w-full mt-4">
            <div className="flex gap-1 items-start">
              {/* like and dislike btn */}
              <div className="flex items-center flex-col">
                <UserLikeDislikeButton
                  userId={currentUser as string}
                  pinId={pin._id.toString()}
                  likeInfo={pin.like?.includes(currentUser)}
                />
                <p className="text-sm font-medium">{pin.like?.length ?? 0}</p>
              </div>

              {/* Add pin comment section */}
              <AddPinComment
                userId={currentUser as string}
                pinId={pin._id.toString()}
              />
            </div>

            {/* bookmark btn */}
            <PinBookmark
              userId={currentUser as string}
              pinId={pin._id.toString()}
              bookmarkInfo={
                currentUserDetails?.bookmarks?.includes(id) ?? false
              }
            />
          </div>
        ) : (
          <div className="mt-3 flex flex-row gap-x-1.5 items-center">
            <AlertCircle color="red" />
            <h1 className="text-red-500 font-medium">
              You need to login to view more details of this post
            </h1>
          </div>
        )}
      </CardContent>

      {session?.user && comments?.length > 0 && (
        <CardFooter className="w-full">
          <PinComments
            userId={currentUser as string}
            comments={comments}
            length={comments.length}
          />
        </CardFooter>
      )}
    </Card>
  );
}

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = (await params).id;
  return {
    title: `View Pin`,
    description: `See full details of the pin with ID: ${id}. Like, bookmark or share it.`,
    openGraph: {
      title: "Pin Details",
      description: "Engage with unique pins on Preronaa.",
      url: `/pin/${id}`,
      siteName: "Preronaa",
      type: "article",
    },
  };
};
