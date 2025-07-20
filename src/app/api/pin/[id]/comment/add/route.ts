import { connectToDatabase } from "@/lib/db";
import Comment from "@/models/Comment";
import Pin from "@/models/Pin";
import User from "@/models/User";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {

        const { userId, comment } = await request.json()
        const pinId = (await params).id as string

        await connectToDatabase()

        const user = await User.findById(userId)
        if (!user) {
            return NextResponse.json({ message: "No user found with this id" }, { status: 400 })
        }

        const pin = await Pin.findById(pinId)
        if (!pin) {
            return NextResponse.json({ message: "No pin found with this id" }, { status: 400 })
        }

        if (!comment) {
            return NextResponse.json({ status: 200 })
        }

        await Comment.create({ comment, creator: userId, pinId })

        return NextResponse.json({ message: "Comment added" }, { status: 201 })
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json({ error: "Server error occured" }, { status: 500 })
    }
}