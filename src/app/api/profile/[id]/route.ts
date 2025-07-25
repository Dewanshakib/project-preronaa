
import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";


export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {



        const { id } = await params

        await connectToDatabase()

        const user = await User.findById(id).select(["-password", "-avaterId"]).lean()
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