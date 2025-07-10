import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import User, { IUser } from "@/models/User";
import bcrypt from "bcryptjs"
import { registerSchema } from "@/lib/schema";
import { connectToDatabase } from "@/lib/db";

export async function POST(request: NextRequest) {
    const body = await request.json()

    // zod validation
    const parsed = registerSchema.safeParse(body)

    if (!parsed.success) {
        return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 })
    }

    // zod validated data
    const data = parsed.data

    // connect db
    await connectToDatabase()

    const user = await User.findOne({ email: data.email }) as IUser
    if (user) {
        return NextResponse.json({ error: "Email already registerd" }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(data.password, 16)

    await User.create({
        email: data.email,
        username: data.username,
        password: hashedPassword
    })

    return NextResponse.json({ message: "User registerd successfully" }, { status: 201 })

}