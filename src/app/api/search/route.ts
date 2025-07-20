import { connectToDatabase } from "@/lib/db";
import Pin from "@/models/Pin";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";


export async function GET(request: NextRequest) {
    try {
        const queryValue = request.nextUrl.searchParams.get("query") as string

        await connectToDatabase()

        const pins = await Pin.find().select(['-photoId', '-like', '-creator'])

        const filteredPins = pins.filter((pin) => (
            pin.caption.toLowerCase().includes(queryValue?.toLowerCase())
        ))

        return NextResponse.json(filteredPins, { status: 200 })
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 })
        }
        return NextResponse.json({ error: "Server error occured" }, { status: 500 })
    }
} 
