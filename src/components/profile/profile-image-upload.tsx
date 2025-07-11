"use client";
import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useRef,
  useState,
} from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Image from "next/image";

function ProfileImageUpload({
  setFile,
}: {
  setFile: Dispatch<SetStateAction<File | undefined>>;
}) {
  const imageRef = useRef<HTMLInputElement | null>(null);

  // to show temporary image
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImgUrl(url);
      setFile(file)
    }
  };

  return (
    <div className="flex md:flex-row flex-col items-center md:gap-5 gap-6">
      {/* avater image */}
      <div className="w-40 h-40 rounded-full border relative">
        {imgUrl ? (
          <Image
            src={imgUrl || ""}
            alt="avater"
            fill
            className="object-cover rounded-full"
          />
        ) : (
          <div className="w-full h-full border rounded-full"></div>
        )}
      </div>

      {/* avater image uplaod */}
      <div className="">
        <Input
          onChange={handleFileChange}
          type="file"
          ref={imageRef}
          className="hidden"
        />
        <Button variant={"outline"} onClick={() => imageRef.current?.click()}>
          Choose your photo
        </Button>
      </div>
    </div>
  );
}

export default ProfileImageUpload;

