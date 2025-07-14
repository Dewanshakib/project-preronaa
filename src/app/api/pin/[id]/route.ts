import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import Pin from "@/models/Pin";
import { connectToDatabase } from "@/lib/db";


export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const id = (await params).id

        await connectToDatabase()

        const pins = await Pin.findById(id)

        return NextResponse.json(pins, { status: 200 })

    } catch (error: any) {
        return NextResponse.json({ error: "Server error occured" }, { status: 500 })

    }
}