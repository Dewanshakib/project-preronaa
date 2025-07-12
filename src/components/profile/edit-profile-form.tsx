"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Card, CardContent, CardHeader } from "../ui/card";
import ProfileImageUpload from "./profile-image-upload";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ISession } from "@/types/types";
import { useForm } from "react-hook-form";
import { editProfileInput, editProfileSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";

function EditProfileForm({ userDetails }: { userDetails: ISession }) {
  const [file, setFile] = useState<File | undefined>(undefined);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<editProfileInput>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      username: userDetails.name,
      email: userDetails.email,
      bio: userDetails.bio || "",
    },
  });

  // console.log(file)
  const onSubmit = async (data: editProfileInput) => {
    const formData = new FormData();

    formData.append("userId", userDetails.id);
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("bio", data.bio);
    formData.append("file", file as File);

    const res = await fetch("/api/profile/edit", {
      method: "POST",
      body: formData,
    });

    const result = await res?.json();
    if (!res?.ok) {
      toast.error(result.error);
      return;
    }
    toast.success(result.message);
    setTimeout(() => {
      router.push(`/profile`);
    }, 1000);
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full mb-3">
              <Label htmlFor="username">Username</Label>
              <Input
                {...register("username")}
                className=" w-full mt-1.5"
                name="username"
                type="text"
              />
              {errors.username && (
                <span className="text-red-500 mt-1 font-medium text-sm">
                  {errors.username.message}
                </span>
              )}
            </div>
            <div className="w-full mb-3">
              <Label htmlFor="email">Email</Label>
              <Input
                {...register("email")}
                className=" w-full mt-1.5"
                name="email"
                type="email"
              />
              {errors.email && (
                <span className="text-red-500 mt-1 font-medium text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className="w-full mb-3">
              <Label htmlFor="bio">Bio</Label>
              <Input
                {...register("bio")}
                className=" w-full mt-1.5"
                name="bio"
                type="text"
                placeholder="Add your bio"
              />
              {errors.bio && (
                <span className="text-red-500 mt-1 font-medium text-sm">
                  {errors.bio.message}
                </span>
              )}
            </div>
            <Button disabled={isSubmitting} type="submit" className="w-full ">
              {isSubmitting ? "Saving..." : "Save"}
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}

export default EditProfileForm;
