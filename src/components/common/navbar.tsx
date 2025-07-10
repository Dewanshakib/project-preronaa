"use client";
import React from "react";
import logo from "@/assets/p_logo.png";
import Link from "next/link";
import Image from "next/image";
import { CirclePlus, CircleUser } from "lucide-react";
import { Button } from "../ui/button";
import { signOut, useSession } from "next-auth/react";

function Navbar() {
  const { data: session } = useSession();
  // console.log(session)

  return (
    <div>
      <div className="flex items-center justify-between py-2">
        {/* Logo */}
        <Link className="flex items-center gap-1" href={"/"}>
          <Image
            src={logo}
            alt="pinterest logo"
            priority
            width={40}
            height={40}
          />
          <h1 className="font-bold text-2xl">Pinterest</h1>
        </Link>

        {/* navlinks */}
        <div className="flex items-center gap-3">
          {session && session.user ? (
            <>
              <Button variant={"link"}>
                <Link href={"/profile/:id"}>
                  <CircleUser className="size-7" />
                </Link>
              </Button>
              <Button>
                <Link className="flex items-center gap-1" href={"/create"}>
                  <p className="font-bold ">Create</p>{" "}
                  <CirclePlus className="size-4" />
                </Link>
              </Button>
              <form action={async () => await signOut()}>
                <Button type="submit" variant={"outline"}>
                  Logout
                </Button>
              </form>
            </>
          ) : (
            <>
              <Button variant={"outline"}>
                <Link href={"/login"}>Login</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
