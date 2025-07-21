import { connectToDatabase } from "@/lib/db";
import Pin from "@/models/Pin";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";


export async function GET(request: NextRequest) {
    try {
        const query = request.nextUrl.searchParams.get("query") as string
        const page = parseInt(request.nextUrl.searchParams.get("page") as string)
        const limit = parseInt(request.nextUrl.searchParams.get("limit") as string)

        await connectToDatabase()

        const skip = ((page - 1) / limit)
        const totalPins = await Pin.countDocuments({})
        const totalPages = Math.floor(((totalPins) / limit))

        // paginated items
        const paginatedPins = await Pin.find().select(['-creator', '-photoId', '-like']).sort({ createdAt: -1 }).skip(skip).limit(limit).lean()

        // paginated filterd items
        const filteredPins = paginatedPins.filter((pin) => pin.caption.toLowerCase().includes(query))


        return NextResponse.json({ pins: filteredPins, total_page: totalPages, page: page }, { status: 200 })
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 })
        }
        return NextResponse.json({ error: "Server error occured" }, { status: 500 })
    }
} 
