"use client";
import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import Image from "next/image";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { ChevronLeftIcon } from "lucide-react";
import logo from "@/assets/p_logo.png";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordInput, resetPasswordSchema } from "@/lib/schema";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function ResetPasswordForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<resetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: resetPasswordInput) => {
    try {
      const res = await fetch("/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res?.json();
      if (!res?.ok) {
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
            alt="pinterest logo"
            fill
            sizes="max-w-[120px]"
          />
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold">Reset password</h1>
          <p className="text-sm font-medium text-black/80 mt-1">
            Please kindly set your new password
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-2">
            <Label>New password</Label>
            <Input
              {...register("password")}
              placeholder="*************"
              className="w-full mt-2"
            />
            {errors.password && (
              <span className="text-red-500 mt-1 font-medium text-sm">
                {errors.password.message}
              </span>
            )}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2"
            >
              Update
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

export default ResetPasswordForm;
