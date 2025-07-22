import { connectToDatabase } from "@/lib/db";
import Comment from "@/models/Comment";
import isValidated from "@/utils/isValidated";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";


export async function DELETE(request: NextRequest, { params }: { params: Promise<{ cid: string }> }) {
    try {

        if (!await isValidated()) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 400 })
        }

        const commentId = (await params).cid as string

        await connectToDatabase()

        const comment = await Comment.findById(commentId)
        if (!comment) {
            return NextResponse.json({ message: "No comment found with this id" }, { status: 400 })
        }

        await Comment.findByIdAndDelete(commentId)

        return NextResponse.json({ message: "Comment deleted successfully" }, { status: 200 })

    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 })
        }
        return NextResponse.json({ error: "Server error occured" }, { status: 500 })
    }
}
