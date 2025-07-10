"use client";
import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Image from "next/image";
import logo from "@/assets/p_logo.png";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { loginInput, loginSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast } from "sonner";

function LoginForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<loginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: loginInput) => {
    try {
      const res = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (!res?.ok) {
        toast.error("Check your email or password");
        return;
      }

      toast.success("User logged in successfully");
      router.push("/");
    } catch (error) {
      throw error;
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
            alt="pinterest logo"
            fill
            sizes="max-w-[120px]"
          />
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold">Welcome to Pinterest</h1>
          <p className="text-sm font-medium text-black/80">
            To view more please login
          </p>
        </div>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full mb-4">
            <Label>Email</Label>
            <Input
              {...register("email")}
              className="w-full mt-1"
              placeholder="dewanshakib@gmail.com"
            />
            {errors.email && (
              <span className="text-red-500 mt-1 font-medium text-sm">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="w-full mb-1">
            <Label>Password</Label>
            <Input
              {...register("password")}
              className="w-full mt-1"
              placeholder="*************"
            />
            {errors.password && (
              <span className="text-red-500 mt-1 font-medium text-sm">
                {errors.password.message}
              </span>
            )}
          </div>
          <div className="inline-flex w-full justify-end">
            <Link
              className="text-sm font-medium text-gray-700 underline"
              href={"/forget-password"}
            >
              Forget password
            </Link>
          </div>
          <Button
            disabled={isSubmitting}
            type="submit"
            className="w-full font-semibold mt-2"
          >
            Login
          </Button>
        </form>
      </CardContent>

      <CardFooter>
        <div className="text-sm font-medium mx-auto -mt-3">
          <span className="text-black/80">
            Don't have an account?
            <Link
              className="underline font-semibold text-black"
              href={"/register"}
            >
              Register
            </Link>{" "}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}

export default LoginForm;
