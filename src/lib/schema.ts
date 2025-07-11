import * as z from "zod/v4"

export const registerSchema = z.object({
    username: z.string().min(5, { message: "Username must be at least 5 characters long" }),
    email: z.string().email({ message: "Invalid Email" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters long" })
})

export type registerInput = z.infer<typeof registerSchema>

export const loginSchema = z.object({
    email: z.string().email({ message: "Invalid Email" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters long" })
})

export type loginInput = z.infer<typeof loginSchema>

export const forgetPasswordSchema = z.object({
    email: z.string().email({ message: "Invalid Email" }),
})

export type forgetPasswordInput = z.infer<typeof forgetPasswordSchema>

export const resetPasswordSchema = z.object({
    password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
    token: z.string().min(24, { message: "Invalid token" })
})

export type resetPasswordInput = z.infer<typeof resetPasswordSchema>