import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { CirclePlus, CircleUser, Menu } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { signOut } from "next-auth/react";

function DropDownMenuNavbar() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"}>
          <Menu className="size-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44 p-2">
        <div className="flex flex-col w-full items-start gap-y-2.5 mb-2.5">
          <Link href={"/profile"} className="w-full">
            <Button variant={"outline"} className="w-full">
              <CircleUser className="size-5" /> <p>Profile</p>
            </Button>
          </Link>
          <Link href={"/pin/create"} className="w-full">
            <Button variant={"default"} className="w-full">
              <CirclePlus className=" size-5" /> <p>Create</p>
            </Button>
          </Link>
        </div>

        <form action={async () => await signOut()}>
          <Button className="w-full" type="submit" variant={"secondary"}>
            Logout
          </Button>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default DropDownMenuNavbar;
