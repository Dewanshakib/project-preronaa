"use client";
import React from "react";
import logo from "@/assets/preronaa_logo.png";
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
        <Link className="flex items-center gap-2" href={"/"}>
          <Image
            src={logo}
            alt="preronaa logo"
            priority
            width={24}
            height={24}
          />

          <h1 className="font-bold text-2xl">Preronaa</h1>
        </Link>

        {/* navlinks */}
        <div className="flex items-center gap-2">
          {session && session.user ? (
            <>
              <Button variant={"link"}>
                <Link href={`/profile/${session.user.id}`}>
                  <CircleUser className="size-7" />
                </Link>
              </Button>
              <Button>
                <Link className="flex items-center gap-1" href={"/create"}>
                  <p className="font-bold hidden md:block">Create</p>{" "}
                  <CirclePlus className="md:size-4 size-5" />
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
