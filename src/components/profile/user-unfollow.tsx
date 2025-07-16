"use client";
import React, { FormEvent } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function UserUnfollow({ userId }: { userId: string }) {

  const router = useRouter()
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/profile/follow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      const result = await res?.json();
      if (!res.ok) {
        toast.error(result.error || "Something went wrong!");
      }

      toast.success(result.message);
      router.refresh()
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <Button type="submit" variant={"outline"} className="mt-4">
          Unfollow
        </Button>
      </form>
    </div>
  );
}

export default UserUnfollow;
