"use client";

import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import Image from "next/image";
import logo from "@/assets/preronaa_logo.png";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { ChevronLeftIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgetPasswordInput, forgetPasswordSchema } from "@/lib/schema";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function ForgetPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<forgetPasswordInput>({
    resolver: zodResolver(forgetPasswordSchema),
  });

  const router = useRouter();

  const onSubmit = async (data: forgetPasswordInput) => {
    try {
      const res = await fetch("/api/auth/forget-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res?.json();
      if (!res.ok) {
        toast.error(result.message);
        return;
      }
      toast.success(result.message);
      router.push("/reset-password");
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <Card className="max-w-md w-full">
      <CardHeader>
        <div className="w-full h-30 relative">
          <Image
            src={logo}
            priority
            className="object-contain"
            alt="preronaa logo"
            fill
            sizes="(max-width:120px)"
          />
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold">Forgot your password</h1>
          <p className="text-sm font-medium text-black/80 mt-1">
            Enter your email so that we can send you password reset token
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-2">
            <Label>Email</Label>
            <Input
              {...register("email")}
              placeholder="eg. dewanshakib@gmail.com"
              className="w-full mt-2"
            />
            {errors.email && (
              <span className="text-red-500 mt-1 font-medium text-sm">
                {errors.email.message}
              </span>
            )}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2"
            >
              {isSubmitting ? "Sending..." : "Send token"}
            </Button>
          </div>
        </form>
        <Button variant={"outline"} className="mt-3">
          <Link className="flex items-center gap-2" href={"/login"}>
            <ChevronLeftIcon /> Back to Login
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

export default ForgetPasswordForm;
