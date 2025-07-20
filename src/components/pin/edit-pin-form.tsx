"use client";
import React, { ChangeEvent, useState } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import Link from "next/link";
import { Button } from "../ui/button";
import { ChevronLeft, Trash2, UploadCloudIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { editPinInput, editPinSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Image from "next/image";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { IPinDetails } from "@/types/types";

function EditPinForm({ pinDetails }: { pinDetails: IPinDetails }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<editPinInput>({
    resolver: zodResolver(editPinSchema),
    defaultValues: { caption: pinDetails.caption },
  });

  const [file, setFile] = useState<File | null>(null);
  const [imagePrev, setImgagePrev] = useState<string | undefined>(
    pinDetails.photoUrl
  );
  const handlePinImage = (e: ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files?.[0];
    if (image) {
      setFile(image);
      if (imagePrev) {
        URL.revokeObjectURL(imagePrev);
      }
      const url = URL.createObjectURL(image);
      setImgagePrev(url);
    }
  };

  const onSubmit = async (data: editPinInput) => {
    try {
      const formData = new FormData();
      formData.append("pinId", pinDetails._id);
      formData.append("caption", data.caption);
      if (file) formData.append("image", file);

      const res = await fetch(`/api/pin/edit`, {
        method: "PUT",
        body: formData,
      });

      const result = await res?.json();
      if (!res.ok) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);
      router.push("/profile");
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className="max-w-3xl mx-auto w-full mt-20">
      <CardHeader>
        <Link href={`/pin/${pinDetails._id}`} className="w-fit">
          <Button variant="outline" className="inline-flex gap-2 items-center">
            <ChevronLeft className="size-5" />
          </Button>
        </Link>

        <div className="mt-5">
          <h1 className="text-2xl text-center font-bold text-black/80">
            Edit Pin
          </h1>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* pin image section starts */}
          <div className="w-full">
            {imagePrev ? (
              <div className="w-full h-80 relative">
                <Image
                  src={imagePrev!}
                  alt="photo"
                  fill
                  className="object-cover rounded-sm"
                />
                <span className="absolute top-2 right-2">
                  <Button
                    onClick={() => {
                      setFile(null);
                      setImgagePrev(undefined);
                      URL.revokeObjectURL(imagePrev);
                    }}
                    variant={"outline"}
                    size={"icon"}
                  >
                    <Trash2 />
                  </Button>
                </span>
              </div>
            ) : (
              <Label
                htmlFor="file-upload"
                className="h-80 border grid place-items-center hover:bg-gray-100 rounded-sm"
              >
                <div className="">
                  <Input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handlePinImage}
                  />
                  <span className="inline-flex items-center gap-2 font-medium text-lg">
                    <UploadCloudIcon size={40} /> Choose your image
                  </span>
                </div>
              </Label>
            )}

            {/* {!file && fileErr && (
              <p className="font-medium text-sm text-red-500 mt-1.5">
                {fileErr}
              </p>
            )} */}
          </div>
          {/* pin image section ends */}

          {/* pin detail section */}
          <div className="mt-5">
            <Label htmlFor="caption">Caption</Label>
            <Input
              {...register("caption")}
              className="mt-1.5"
              id="caption"
              type="text"
              placeholder="The image describes the beauty of nature..."
            />
            {errors.caption && (
              <p className="font-medium text-sm text-red-500 mt-1.5">
                {errors.caption.message}
              </p>
            )}
          </div>
          <Button disabled={isSubmitting} type="submit" className="w-full mt-3">
            {isSubmitting ? "Updating..." : "Update"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default EditPinForm;
