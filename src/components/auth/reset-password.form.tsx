"use client";
import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import Image from "next/image";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import logo from "@/assets/preronaa_logo.png";
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
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res?.json();
      if (!res?.ok) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);
      router.push("/login");
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
            alt="pinterest logo"
            fill
            sizes="(max-width:120px)"
          />
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold">Reset password</h1>
          <p className="text-sm font-medium text-black/80 mt-1">
            Please put the token from your email & set your new password
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-2">
            <div className="mb-3">
              <Label>Enter token</Label>
              <Input
                {...register("token")}
                placeholder="*************"
                className="w-full mt-2"
                type="password"
              />
              {errors.token && (
                <span className="text-red-500 mt-1 font-medium text-sm">
                  {errors.token.message}
                </span>
              )}
            </div>
            <div className="mb-3">
              <Label>New password</Label>
              <Input
                {...register("password")}
                placeholder="*************"
                className="w-full mt-2"
                type="password"
              />
              {errors.password && (
                <span className="text-red-500 mt-1 font-medium text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2"
            >
              {isSubmitting ? "Pending..." : "Update"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default ResetPasswordForm;
