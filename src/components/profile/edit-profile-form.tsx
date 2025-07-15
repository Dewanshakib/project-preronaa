"use client";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { IUserDetails } from "@/types/types";
import { useForm } from "react-hook-form";
import { editProfileInput, editProfileSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";

function EditProfileForm({ userDetails }: { userDetails: IUserDetails }) {
  const router = useRouter();
  const imageRef = useRef<HTMLInputElement | null>(null);
  const [imageFile, setImageFile] = useState<File | undefined>(undefined);
  const [imgUrl, setImgUrl] = useState<string | null>(
    (userDetails.avater && userDetails.avater) || null
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<editProfileInput>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      name: userDetails.name,
      bio: userDetails.bio || "",
    },
  });

  const handleAvaterInput = (e: ChangeEvent<HTMLInputElement>) => {
    const avater = e.target?.files?.[0];
    if (avater) {
      const url = URL.createObjectURL(avater);
      if (imgUrl) {
        URL.revokeObjectURL(imgUrl);
      }
      setImgUrl(url);
      setImageFile(avater);
    }
  };

  const onSubmit = async (data: editProfileInput) => {
    try {
      const formData = new FormData();

      formData.append("userId", userDetails._id);
      formData.append("name", data.name);
      formData.append("bio", data.bio || "");
      if (imageFile) formData.append("avater", imageFile);

      const res = await fetch("/api/profile/edit", {
        method: "PUT",
        body: formData,
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result?.error || "Something went wrong!");
        return;
      }

      toast.success(result.message || "Profile updated!");
      router.push(`/profile`);
      router.refresh();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card className="max-w-2xl w-full mx-auto mt-10">
      <CardHeader>
        <Link href="/profile" className="w-fit">
          <Button variant="outline" className="inline-flex gap-2 items-center">
            <ChevronLeft className="size-5" />
          </Button>
        </Link>
        <div className="mt-5 text-center">
          <h1 className="text-2xl font-bold">Edit Profile</h1>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col items-center mt-6 w-full">
        {/* Image Preview */}
        <div className="flex md:flex-row flex-col items-center md:gap-5 gap-6">
          <div className="w-40 h-40 rounded-full border relative overflow-hidden">
            {imgUrl ? (
              <Image
                src={imgUrl}
                alt="avatar"
                fill
                className="object-cover rounded-full"
                sizes="(max-width:160px)"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center rounded-full bg-gray-100">
                <span className="text-4xl text-black/70 font-bold">
                  {userDetails.name.charAt(0)}
                </span>
              </div>
            )}
          </div>

          <div>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvaterInput}
              ref={imageRef}
            />
            <Button variant="outline" onClick={() => imageRef.current?.click()}>
              Choose your photo
            </Button>
          </div>
        </div>

        {/* Form Fields */}
        <div className="mt-8 w-full max-w-md">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input {...register("name")} type="text" className="mt-1.5" />
              {errors.name && (
                <p className="text-red-500 mt-1 text-sm">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="bio">Bio</Label>
              <Input
                {...register("bio")}
                type="text"
                placeholder="Add your bio"
                className="mt-1.5"
              />
              {errors.bio && (
                <p className="text-red-500 mt-1 text-sm">
                  {errors.bio.message}
                </p>
              )}
            </div>

            <Button
              disabled={isSubmitting}
              type="submit"
              className="w-full mt-1"
            >
              {isSubmitting ? "Saving..." : "Save"}
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}

export default EditProfileForm;
