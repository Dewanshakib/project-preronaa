import EditProfileForm from "@/components/profile/edit-profile-form";
import { authOptions } from "@/lib/authOptions";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import React from "react";

export default async function EditProfile() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  const res = await fetch(`${process.env.BASE_URL}/api/profile/${userId}`);
  const user = await res?.json();

  return (
    <div className="w-full h-auto">
      <EditProfileForm userDetails={user} />
    </div>
  );
}

export const metadata: Metadata = {
  title: "Edit Profile",
  description: "Update your profile info, username, bio and more.",
  openGraph: {
    title: "Edit Your Preronaa Profile",
    description: "Keep your profile up-to-date with your latest info.",
    url: "/profile/edit",
    siteName: "Preronaa",
    type: "website",
  },
};
