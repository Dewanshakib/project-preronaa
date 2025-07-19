"use client";
import React, { FormEvent } from "react";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function PinCommentDeleteBtn({
  pinId,
  commentId,
}: {
  pinId: string;
  commentId: string;
}) {
  const router = useRouter();
  const deleteComment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/pin/${pinId}/comment/${commentId}/delete`, {
        method: "DELETE",
      });

      const result = await res?.json();
      if (!res?.ok) {
        toast.error(result.error);
        return;
      }

      toast.success(result.message);
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={deleteComment}>
      <Button type="submit" className="" size={"icon"} variant={"destructive"}>
        <Trash2 />
      </Button>
    </form>
  );
}

export default PinCommentDeleteBtn;
