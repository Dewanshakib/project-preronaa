import CreatePinForm from "@/components/pin/create-pin-form";
import { authOptions } from "@/lib/authOptions";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import React from "react";

export default async function CreatePin() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  const res = await fetch(
    `${process.env.BASE_URL}/api/profile/${userId}`
  );
  const user = await res?.json();

  // console.log(session)

  return (
    <div>
      <CreatePinForm creatorId={user?._id}/>
    </div>
  );
}

export const metadata:Metadata = {
  title: "Create Pin",
  description: "Upload and share your ideas with the world through a new pin.",
  openGraph: {
    title: "Create a New Pin",
    description: "Design and publish new pins for the community to engage with.",
    url: "/pin/create",
    siteName: "Preronaa",
    type: "website",
  },
};
