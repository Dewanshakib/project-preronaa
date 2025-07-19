"use client";
import React, { FormEvent, useState } from "react";
import { Button } from "../ui/button";
import { ICommentDetails } from "@/types/types";
import CommentCard from "./comment-card";

function PinComments({
  userId,
  comments,
  length,
}: {
  userId:string,
  pinId?: string;
  comments: ICommentDetails[];
  length: number;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col w-full p-2">
      <div className="flex flex-col mb-3 w-fit">
        <Button
          type="button"
          onClick={handleToggle}
          variant={"ghost"}
          className="text-gray-900"
        >
          {isOpen ? "Show less" : `View all ${length} comment`}
        </Button>
      </div>

      <div
        className={`${
          isOpen
            ? "max-h-50 overflow-y-auto opacity-100 scale-100 translate-y-0"
            : "max-h-0 opacity-0 scale-95 -translate-y-2"
        } transition-all duration-300 ease-in-out overflow-hidden w-full`}
      >
        {/* comment section */}
        <div className="grid grid-cols-1 gap-4 border rounded-2xl p-2">
          {comments.map((comment: ICommentDetails) => (
            <CommentCard key={comment._id} comment={comment} userId={userId}/>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PinComments;
