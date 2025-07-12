import EditProfileForm from "@/components/profile/edit-profile-form";
import { authOptions } from "@/lib/authOptions";
import { ISession } from "@/types/types";
import { getServerSession } from "next-auth";
import React from "react";

export default async function EditProfile() {
  const session = await getServerSession(authOptions);

  return (
    <div className="w-full h-auto">
      <EditProfileForm userDetails={session?.user as ISession} />
    </div>
  );
}
