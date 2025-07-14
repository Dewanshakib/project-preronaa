"use client";
import React, { ChangeEvent, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Image from "next/image";
import logo from "@/assets/preronaa_logo.png";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { registerInput, registerSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeOffIcon } from "lucide-react";

function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<registerInput>({
    resolver: zodResolver(registerSchema),
  });

  const [eyeOpen, setEyeOpen] = useState(false);
  const handleEyeOpen = () => {
    setEyeOpen(!eyeOpen);
  };

  const router = useRouter();

  const onSubmit = async (data: registerInput) => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res?.json();
      if (!res.ok) {
        toast.error(result.error);
        return;
      }
      toast.success(result.message);
      router.push("/login");
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
            alt="preronaa logo"
            fill
            sizes="(max-width:120px)"
          />
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold">Welcome to Preronaa</h1>
          <p className="text-sm font-medium text-black/80">
            To view more please register
          </p>
        </div>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full mb-4">
            <Label>Name</Label>
            <Input
              {...register("name")}
              className="w-full mt-1"
              placeholder="Dewan Shakib"
            />
            {errors.name && (
              <span className="text-red-500 mt-1 font-medium text-sm">
                {errors.name.message}
              </span>
            )}
          </div>
          <div className="w-full mb-4">
            <Label>Username</Label>
            <Input
              {...register("username")}
              className="w-full mt-1"
              placeholder="dewan_op"
            />
            {errors.username && (
              <span className="text-red-500 mt-1 font-medium text-sm">
                {errors.username.message}
              </span>
            )}
          </div>
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
          <div className="w-full mb-4 relative">
            <Label>Password</Label>
            <Input
              {...register("password")}
              className="w-full mt-1"
              placeholder="*************"
              type={eyeOpen ? "text" : "password"}
            />
            {
              <Button
                type="button"
                className="absolute top-4.5 right-0"
                variant={"outline"}
                onClick={handleEyeOpen}
              >
                {eyeOpen ? (
                  <EyeIcon className="size-4.5" />
                ) : (
                  <EyeOffIcon className="size-4.5" />
                )}
              </Button>
            }
            {errors.password && (
              <span className="text-red-500 mt-1 font-medium text-sm">
                {errors.password.message}
              </span>
            )}
          </div>
          <Button
            disabled={isSubmitting}
            type="submit"
            className="w-full font-semibold"
          >
            {isSubmitting ? "Pending..." : "Register"}
          </Button>
        </form>
      </CardContent>

      <CardFooter>
        <div className="text-sm font-medium mx-auto -mt-3">
          <span className="text-black/80">
            Already have an account?
            <Link
              className="underline font-semibold text-black"
              href={"/login"}
            >
              Login
            </Link>{" "}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}

export default RegisterForm;
