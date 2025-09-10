"use client";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Bookmark } from "lucide-react";

function PinBookmark({
  userId,
  pinId,
  bookmarkInfo,
}: {
  userId: string;
  pinId: string;
  bookmarkInfo: boolean;
}) {
  const router = useRouter();
  const [bookmarked, setBookmarked] = useState(bookmarkInfo);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setBookmarked(!bookmarked);

    try {
      const res = await fetch("/api/pin/bookmarks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, pinId }),
      });

      const result = await res?.json();
      if (!res.ok) {
        toast.error(result.message);
        setBookmarked(bookmarkInfo);
        return;
      } else {
        toast.success(result.message);
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    } 
  };

  return (
    <form onSubmit={onSubmit}>
      {bookmarked ? (
        <Button  type="submit" variant={"ghost"}>
          <Bookmark className="size-6" fill="black" />
        </Button>
      ) : (
        <Button  type="submit" variant={"ghost"}>
          <Bookmark className="size-6" />
        </Button>
      )}
    </form>
  );
}

export default PinBookmark;
