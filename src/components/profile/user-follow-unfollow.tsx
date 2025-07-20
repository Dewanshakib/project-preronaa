"use client";
import React, { FormEvent} from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function UserFollowUnfollow({
  userId,
  currentUser,
  followInfo,
}: {
  userId: string;
  currentUser: string;
  followInfo: boolean;
}) {
  const router = useRouter();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/profile/follow&Unfollow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      const result = await res?.json();
      if (!res.ok) {
        toast.error(result.message);
      }

      toast.success(result.message);
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        {followInfo ? (
          <Button type="submit" variant={"outline"} className={`${currentUser === userId && "hidden"} mt-4`}>
            Unfollow
          </Button>
        ) : (
          <Button type="submit" variant={"outline"} className={`${currentUser === userId && "hidden"} mt-4`}>
            Follow
          </Button>
        )}
      </form>
    </div>
  );
}

export default UserFollowUnfollow;
