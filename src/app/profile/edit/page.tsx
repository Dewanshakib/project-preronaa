import EditProfileForm from "@/components/profile/edit-profile-form";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import React from "react";

export default async function EditProfile() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  const res = await fetch(
    `${process.env.BASE_URL}/api/profile/${userId}`
  );
  const user = await res?.json();

  return (
    <div className="w-full h-auto">
      <EditProfileForm userDetails={user} />
    </div>
  );
}
