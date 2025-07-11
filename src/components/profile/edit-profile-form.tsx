"use client";
import React, { FormEvent, useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Card, CardContent, CardHeader } from "../ui/card";
import ProfileImageUpload from "./profile-image-upload";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function EditProfileForm({ userId }: { userId: string }) {
  const [file, setFile] = useState<File | undefined>(undefined);
  const [pending, setPending] = useState(false);
  const router = useRouter();

  // console.log(file)
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    try {
      const formData = new FormData(e.currentTarget);
      const username = formData.get("username") as string;
      const email = formData.get("email") as string;
      const bio = formData.get("bio") as string;

      formData.set("userId", userId);
      formData.set("username", username);
      formData.set("email", email);
      formData.set("bio", bio);
      formData.set("file", file as File);

      const res = await fetch("/api/profile/edit", {
        method: "POST",
        body: formData,
      });

      const data = await res?.json();
      if (!res?.ok) {
        toast.error(data.error);
        return;
      }
      toast.success(data.message);
      setTimeout(() => {
        router.push(`/profile/${userId}`);
      }, 1000);
    } catch (error) {
      toast.error("Something went wrong!");
      console.error(error);
    } finally {
      setPending(false);
    }
  };

  return (
    <Card className="max-w-2xl w-full mx-auto mt-10">
      <CardHeader>
        {/* back button */}
        <Link href={`/profile`}>
          <Button
            variant="outline"
            className="w-fit inline-flex gap-2 items-center"
          >
            <ChevronLeft className="size-5" />
          </Button>
        </Link>

        {/* profile header section */}
        <div className="mt-5 text-center">
          <h1 className="text-2xl font-bold">Edit Profile</h1>
        </div>
      </CardHeader>

      <CardContent className="flex justify-center mt-6 flex-col items-center w-full">
        {/* profle image uplaod section*/}
        <ProfileImageUpload setFile={setFile} />

        {/* profile user info section */}
        <div className="mt-8 w-full max-w-md">
          <form onSubmit={onSubmit}>
            <div className="w-full mb-3">
              <Label htmlFor="username">Username</Label>
              <Input
                className=" w-full mt-1.5"
                defaultValue={"Default value of username"}
                name="username"
                type="text"
              />
            </div>
            <div className="w-full mb-3">
              <Label htmlFor="email">Email</Label>
              <Input
                className=" w-full mt-1.5"
                defaultValue={"Default value of email"}
                name="email"
                type="email"
              />
            </div>
            <div className="w-full mb-3">
              <Label htmlFor="bio">Bio</Label>
              <Input
                className=" w-full mt-1.5"
                defaultValue={"Default value of bio"}
                name="bio"
                type="bio"
              />
            </div>
            <Button disabled={pending} type="submit" className="w-full ">
              {pending ? "Saving..." : "Save"}
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}

export default EditProfileForm;

