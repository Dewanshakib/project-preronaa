import EditProfileForm from "@/components/profile/edit-profile-form";
import React from "react";

export default async function EditProfile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const userId = (await params).id;

  return (
    <div className="w-full h-auto">
      <EditProfileForm userId={userId}/>
    </div>
  );
}
