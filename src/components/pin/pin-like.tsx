"use client";

import React, { FormEvent } from "react";
import { Button } from "../ui/button";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function UserLikeButton({ userId, pinId }: { userId: string; pinId: string }) {
  const router = useRouter();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/pin/like", {
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
      <Button type="submit" variant={"ghost"}>
        <Heart className="size-6" fill="red" color="red" />
      </Button>
    </form>
  );
}

export default UserLikeButton;
