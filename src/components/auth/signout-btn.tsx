"use client";
import React, { FormEvent } from "react";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

function SignOutBtn() {
  const router = useRouter();
  const signoutHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signOut();
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={signoutHandler}>
      <Button type="submit" variant={"outline"}>
        Logout
      </Button>
    </form>
  );
}

export default SignOutBtn;
