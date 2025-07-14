import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { IPinDetails } from "@/types/types";
import { Bookmark, Heart, MessageCircle } from "lucide-react";
import Image from "next/image";
import React from "react";

export default async function Pin({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  const res = await fetch(`${process.env.BASE_URL}/api/pin/${id}`);
  const pin: IPinDetails = await res?.json();

  // console.log(pin);

  return (
    <Card className="w-full max-w-4xl mx-auto mt-10 flex flex-col">
      <CardHeader>
        <div className="">
          <h1 className="font-medium text-xl">{pin.caption}</h1>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative w-full aspect-[16/9]">
          <Image
            src={pin.photoUrl}
            alt="Awesome Image"
            fill
            className="object-cover rounded-lg"
            priority
          />
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex items-center justify-between gap-3 w-full">
          <div className="">
            <Button variant={"ghost"}>
              <Heart className="size-6" />
            </Button>
            <Button variant={"ghost"}>
              <MessageCircle className="size-5.5" />
            </Button>
          </div>

          <Button variant={"ghost"}>
            <Bookmark className="size-5.5" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
