import { connectToDatabase } from "@/lib/db";
import Pin, { IPin } from "@/models/Pin";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";



export async function POST(request: NextRequest) {
    try {

        const { userId, pinId } = await request.json()

        await connectToDatabase()

        const pin = await Pin.findById(pinId) as IPin
        if (!pin) {
            return NextResponse.json({ error: "No pin found with this id" }, { status: 400 })
        }

        // pin like or dislike login
        if (pin.like?.includes(userId)) {
            await Pin.findByIdAndUpdate(pinId, { $pull: { like: userId } })
            return NextResponse.json({ message: "You disliked the pin" }, { status: 200 })
        } else {
            await Pin.findByIdAndUpdate(pinId, { $push: { like: userId } })
            return NextResponse.json({ message: "You liked the pin" }, { status: 200 })
        }

    } catch (error: any) {
        return NextResponse.json({ error: error.error }, { status: 500 })
    }
}