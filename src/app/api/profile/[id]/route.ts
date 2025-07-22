import { connectToDatabase } from "@/lib/db";
import User, { IUser } from "@/models/User";
import isValidated from "@/utils/isValidated";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";


export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {

        if (!await isValidated()) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 400 })
        }

        const { id } = await params

        await connectToDatabase()

        const user = await User.findById(id).select("-password") as IUser
        if (!user) {
            return NextResponse.json({ message: "No user found with this id" }, { status: 400 })
        }

        return NextResponse.json(user, { status: 200 })
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 })
        }
        return NextResponse.json({ error: "Server error occured" }, { status: 500 })
    }
}