import { NextResponse } from "next/server";
import Pin from "@/models/Pin";
import { connectToDatabase } from "@/lib/db";


export async function GET() {
    try {

        await connectToDatabase()

        const pins = await Pin.find().sort({ createdAt: -1 })

        return NextResponse.json(pins, { status: 200 })

    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 })
        }
        return NextResponse.json({ error: "Server error occured" }, { status: 500 })

    }
}