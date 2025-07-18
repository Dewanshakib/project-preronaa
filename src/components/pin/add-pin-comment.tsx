"use client";
import React, { FormEvent, useState } from "react";
import { Button } from "../ui/button";
import { MessageCircle } from "lucide-react";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function AddPinComment({ userId, pinId }: { userId: string; pinId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [comment, setComment] = useState<string | undefined>(undefined);
  const commentToggler = () => setIsOpen(!isOpen);
  const router = useRouter();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/pin/comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({userId,pinId,comment}),
      });

      const result = await res?.json();
      if (!res?.ok) {
        toast.error(result.error);
      }

      toast.success(result.message && result.message);
      router.refresh();
      setIsOpen(!isOpen)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative">
      <Button type="button" onClick={commentToggler} variant={"ghost"}>
        <MessageCircle className="size-5.5" />
      </Button>

      <div
        className={`
          transition-all duration-300 ease-in-out overflow-hidden
          ${
            isOpen
              ? "max-h-50 opacity-100 scale-100 translate-y-0"
              : "max-h-0 opacity-0 scale-95 -translate-y-2"
          }
        `}
      >
        <form onSubmit={onSubmit} className="flex items-start mt-3">
          <Input
            onChange={(e) => setComment(e.target.value)}
            className="ml-3 md:w-xl mb-2"
            placeholder="Add your comment here"
          />
          <Button type="submit" className="ml-2">
            Add
          </Button>
        </form>
      </div>


    </div>
  );
}

export default AddPinComment;
