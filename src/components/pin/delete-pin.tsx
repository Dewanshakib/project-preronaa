"use client";

import React from "react";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function DeletePin({ pinId }: { pinId: string }) {
  const router = useRouter();

  const deletePinHandler = async () => {
    try {
      const res = await fetch(`/api/pin/${pinId}`, {
        method: "DELETE",
      });
      const result = await res?.json();
      if (!res.ok) {
        toast.error(result.error);
        return;
      }

      toast.success(result.message);
      router.push("/");
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="">
      <Button
        onClick={deletePinHandler}
        type="submit"
        size={"icon"}
        variant={"destructive"}
      >
        <Trash2 />
      </Button>
    </div>
  );
}
