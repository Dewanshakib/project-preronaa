"use server"
import { cookies } from "next/headers"

// protects api's
export const isValidated = async () => {
    const token = (await cookies()).get("next-auth.session-token")?.value
    return !!token
}