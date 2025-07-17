import Pin from "@/models/Pin";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {

    try {
        const userId = (await params).id

        if (!userId) {
            return NextResponse.json({ error: "No user id found!" }, { status: 400 })
        }


        const userPins = await Pin.find({ creator: userId })
        if (!userPins) {
            return NextResponse.json({ error: "No pins found" }, { status: 400 })
        }

        return NextResponse.json(userPins, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: "Server error occured while getting user pins" }, { status: 500 })
    }

}