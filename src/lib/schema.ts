import * as z from "zod/v4"

export const registerSchema = z.object({
    name: z.string().min(5, { message: "Name must be at least 5 characters long" }),
    username: z.string().min(5, { message: "Username also have be at least 5 characters long" }),
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

export const editProfileSchema = z.object({
    name: z.string().min(5, { message: "Name must be at least 5 characters long" }),
    bio: z.string().max(100, { message: "Bio must be under 100 characters" }).optional(),
})

export type editProfileInput = z.infer<typeof editProfileSchema>


export const createPinSchema = z.object({
    caption: z.string().trim().min(1, { message: "Caption cannot be empty or just spaces" }).max(70, { message: "Caption must be under 70 characters" }),
})

export type createPinInput = z.infer<typeof createPinSchema>


export const editPinSchema = z.object({
    caption: z.string().trim().min(1, { message: "Caption cannot be empty or just spaces" }).max(70, { message: "Caption must be under 70 characters" }),
})

export type editPinInput = z.infer<typeof editPinSchema>