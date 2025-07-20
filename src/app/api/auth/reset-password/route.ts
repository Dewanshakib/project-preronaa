import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import User, { IUser } from "@/models/User";
import { resetPasswordSchema } from "@/lib/schema";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/lib/db";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()

        const parsed = resetPasswordSchema.safeParse(body)

        if (!parsed.success) {
            return NextResponse.json({ message: parsed.error.flatten().fieldErrors }, { status: 400 })
        }

        const data = parsed.data

        await connectToDatabase()

        const user = await User.findOne({
            resetToken: data.token,
            resetTokenExpiry: { $gt: new Date() }
        }) as IUser

        if (!user) {
            return NextResponse.json({ message: "Invalid or expired token" }, { status: 400 })
        }

        const hashedPassword = await bcrypt.hash(data.password, 10)
        user.password = hashedPassword
        user.resetToken = undefined
        user.resetTokenExpiry = undefined

        await user.save()

        return NextResponse.json({ message: "Password updated successfully" }, { status: 200 })
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json({ error: "Unknown error occurred" }, { status: 500 })
    }
}
