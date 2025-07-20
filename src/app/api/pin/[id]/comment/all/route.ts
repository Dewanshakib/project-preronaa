import { connectToDatabase } from "@/lib/db";
import Comment from "@/models/Comment";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";


export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const pinId = (await params).id
        // console.log(pinId)

        await connectToDatabase()

        const comment = await Comment.find({ pinId: pinId }).populate({
            path: "creator",
            select: ["-password", "-name", "-email", "-follower", "-following", "-avaterId", "-bio", "-bookmarks", "-createdAt", "-updatedAt"], // excluding sensetive info..
        })

        return NextResponse.json(comment, { status: 200 })
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 })
        }
        return NextResponse.json({ error: "Server error occured" }, { status: 500 })
    }
}