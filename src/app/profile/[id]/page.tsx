import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import React from "react";

export default async function Profile() {
  const session = await getServerSession(authOptions);
  console.log(session)

  return <div>Profile</div>;
}
