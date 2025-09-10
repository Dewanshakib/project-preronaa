"use client";

import React, { FormEvent, useState } from "react";
import { Button } from "../ui/button";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function UserLikeDislikeButton({
  userId,
  pinId,
  likeInfo,
}: {
  userId: string;
  pinId: string;
  likeInfo: boolean;
}) {
  const router = useRouter();
  const [liked, setLiked] = useState(likeInfo);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLiked(!liked);
    setLoading(true);

    try {
      const res = await fetch("/api/pin/like&dislike", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, pinId }),
      });

      const result = await res?.json();
      if (!res.ok) {
        toast.error(result.message);
        setLiked(likeInfo);
        return;
      } else {
        toast.success(result.message);
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      {liked ? (
        <Button disabled={loading} type="submit" variant={"ghost"}>
          <Heart className="size-6" fill="red" color="red" />
        </Button>
      ) : (
        <Button disabled={loading} type="submit" variant={"ghost"}>
          <Heart className="size-6" />
        </Button>
      )}
    </form>
  );
}

export default UserLikeDislikeButton;
