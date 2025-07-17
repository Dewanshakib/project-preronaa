"use client";
import { useRouter } from "next/navigation";
import React, { FormEvent } from "react";
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

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/pin/bookmark", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, pinId }),
      });

      const result = await res?.json();
      if (!res.ok) {
        toast.error(result.error || "Something went wrong!");
      }

      toast.success(result.message);
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      {bookmarkInfo ? (
        <Button type="submit" variant={"ghost"}>
          <Bookmark className="size-6" fill="black"/>
        </Button>
      ) : (
        <Button type="submit" variant={"ghost"}>
          <Bookmark className="size-6" />
        </Button>
      )}
    </form>
  );
}

export default PinBookmark;
