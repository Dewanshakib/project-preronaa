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
import { SquarePen } from "lucide-react";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";
import AddPinComment from "@/components/pin/add-pin-comment";
import PinComments from "@/components/pin/pin-comments";
import { notFound } from "next/navigation";

// fetch pin
async function fetchPins(pinId: string) {
  // fetching pin
  const resPin = await fetch(`${process.env.BASE_URL}/api/pin/${pinId}`);
  const pin = await resPin?.json();
  return pin;
}

// fetch user info
async function fetchUserInfo(userId: string) {
  const resUser = await fetch(`${process.env.BASE_URL}/api/profile/${userId}`);
  const user = await resUser?.json();
  return user;
}

// fetch comments
async function fetchComments(pinId: string) {
  const resComment = await fetch(
    `${process.env.BASE_URL}/api/pin/${pinId}/comment/all`
  );
  const comments = await resComment?.json();
  return comments;
}

export default async function Pin({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // getting session
  const session = await getServerSession(authOptions);
  const currentUser = session?.user?.id as string;

  // pin
  const pinPromise = fetchPins(id);

  // fetching user info
  const userPromise = fetchUserInfo(currentUser);

  // fetching pin comments
  const commentsPromise = fetchComments(id);

  const [pin, user, comments] = await Promise.all([
    pinPromise,
    userPromise,
    commentsPromise,
  ]);

  if (!pin || pin.error || !pin._id) {
    notFound(); // Redirect to not-found page
  }

  // console.log(comments)

  return (
    <Card className="w-full max-w-4xl mx-auto mt-10 flex flex-col my-8">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="">
            <h1 className="font-medium text-xl mb-6">{pin.caption}</h1>
            <div className="flex items-center gap-1.5 mt-2">
              <div className="w-6 h-6 relative rounded-full overflow-hidden">
                {pin.creator?.avater ? (
                  <Image
                    fill
                    className="object-cover"
                    alt="user photo"
                    loading="lazy"
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
        <Suspense
          fallback={
            <p className="text-2xl font-bold text-center">Loading...</p>
          }
        >
          <div className="relative w-full aspect-[16/9]">
            <Image
              src={pin.photoUrl}
              alt="Awesome Image"
              fill
              className="object-cover rounded-lg"
              loading="lazy"
            />
          </div>
        </Suspense>

        <div className="flex items-start justify-between gap-3 w-full mt-4">
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

            {/* Add pin comment section */}
            <AddPinComment userId={currentUser} pinId={pin._id} />
          </div>

          {/* bookmark btn */}
          <PinBookmark
            userId={currentUser}
            pinId={pin._id}
            bookmarkInfo={user.bookmarks.includes(id)}
          />
        </div>
      </CardContent>
      <CardFooter className="w-full">
        {/* pin comments */}
        {comments.length > 0 && (
          <PinComments
            userId={currentUser}
            comments={comments}
            length={comments.length}
          />
        )}
      </CardFooter>
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
