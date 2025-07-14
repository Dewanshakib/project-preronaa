import CreatePinForm from "@/components/pin/create-pin-form";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import React from "react";

export default async function CreatePin() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/profile/${userId}`
  );
  const user = await res?.json();

  return (
    <div>
      <CreatePinForm creatorId={user?._id}/>
    </div>
  );
}
