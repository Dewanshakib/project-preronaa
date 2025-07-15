import DeletePin from "@/components/pin/delete-pin";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { IPinDetails } from "@/types/types";
import {
  Bookmark,
  Heart,
  MessageCircle,
  SquarePen,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
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
        <div className="flex items-center justify-between">
          <div className="">
            <h1 className="font-medium text-xl">{pin.caption}</h1>
            <Link
              href={`/profile/${pin.creator._id}`}
              className="tex-sm text-gray-600 font-medium"
            >
              @{pin.creator.username}
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Link href={`/pin/edit/${id}`}>
              <Button variant={"outline"}>
                <SquarePen className="size-4" />
              </Button>
            </Link>
            <DeletePin pinId={pin._id}/>
          </div>
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
