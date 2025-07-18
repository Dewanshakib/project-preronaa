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
    <div className={`${!session && "hidden"}`}>
      <div className="flex items-center justify-between">
        {/* Logo */}

        <section className="flex items-center">
          <span className="w-5 h-5 sm:w-6 sm:h-6 relative">
            <Link className="" href={"/"}>
              <Image
                src={logo}
                alt="preronaa logo"
                fill
                sizes="(max-width:24px)"
                priority
                suppressHydrationWarning // handling susspense error
              />
            </Link>
          </span>
          <Link href={'/'}>
            <h1 className="font-bold text-xl sm:text-2xl ml-2">Preronaa</h1>
          </Link>
        </section>

        {/* navlinks */}
        <div className="flex items-center gap-2">
          {session && session.user ? (
            <>
              <Button variant={"link"}>
                <Link href={`/profile`}>
                  <CircleUser className="size-6 sm:size-7" />
                </Link>
              </Button>
              <Button>
                <Link className="flex items-center gap-1" href={"/pin/create"}>
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
