import Image from "next/image";
import React, { FormEvent } from "react";
import { ICommentDetails } from "@/types/types";
import PinCommentDeleteBtn from "./pin-comment-delete";

function CommentCard({
  comment,
  userId,
}: {
  comment: ICommentDetails;
  userId: string;
}) {
  return (
    <div key={comment._id} className="p-2 w-full">
      {/* user info & avater section */}
      <div className="flex items-center w-full justify-between">
        <div className="flex items-center gap-2">
          {comment.creator.avater ? (
            <div className="w-5 h-5 relative rounded-full overflow-hidden">
              <Image
                src={comment.creator.avater}
                fill
                loading="lazy"
                alt="avater photo"
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-5 h-5 bg-gray-300 rounded-full grid place-items-center">
              <p className="text-xs font-bold text-black/80">
                {comment.creator.username.charAt(0).toUpperCase()}
              </p>
            </div>
          )}
          <p className="font-semibold text-black/90">
            {comment.creator.username}
          </p>
        </div>
        {/* delete btn */}
        {userId === comment.creator._id && (
          <PinCommentDeleteBtn pinId={comment.pinId} commentId={comment._id} />
        )}
      </div>
      {/* user text */}
      <div className="mt-2">
        <p className="text-sm font-medium">{comment.comment}</p>
      </div>
    </div>
  );
}

export default CommentCard;
