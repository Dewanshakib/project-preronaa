<<<<<<< HEAD
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
=======
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
>>>>>>> 1fc42fa00d079ccf8f54c2bb68746efbcbc9c5f3
