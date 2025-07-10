import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import crypto from "crypto"
import User, { IUser } from "@/models/User";
import { forgetPasswordSchema } from "@/lib/schema";
import { connectToDatabase } from "@/lib/db";
import { sendEmail } from "@/lib/mail";


export async function POST(request: NextRequest) {
    try {
        const body = await request.json()

        const parsed = forgetPasswordSchema.safeParse(body)

        if (!parsed.success) {
            return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 })
        }

        const data = parsed.data

        await connectToDatabase()

        const user = await User.findOne({ email: data.email }) as IUser
        if (!user) {
            return NextResponse.json({ error: "No user found with this email" }, { status: 400 })
        }

        const resetToken = crypto.randomBytes(12).toString("hex") // token
        const resetTokenExpiry = new Date(Date.now() + 10 * 60 * 1000) // 10 min
        const resetLink = `${process.env.NEXTAUTH_URL}/reset-password/${resetToken}`

        user.resetToken = resetToken
        user.resetTokenExpiry = resetTokenExpiry
        await user.save()

        await sendEmail(data.email, resetLink)
        // console.log(resetLink)

        return NextResponse.json({ status: 200 })
    } catch (error: any) {
        return NextResponse.json({ error: error.error }, { status: 200 })
    }
}