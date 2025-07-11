import EditProfileForm from "@/components/profile/edit-profile-form";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import React from "react";

export default async function EditProfile() {
  
  const session = await getServerSession(authOptions)
  
  const userId = session?.user?.id.toString()

  return (
    <div className="w-full h-auto">
      <EditProfileForm userId={userId!}/>
    </div>
  );
}

