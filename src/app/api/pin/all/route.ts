import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import Pin from "@/models/Pin";
import { connectToDatabase } from "@/lib/db";


export async function GET(request: NextRequest) {
    try {
        const params = request.nextUrl.searchParams
        const current_page = parseInt(params.get("page") as string)
        const limit = parseInt(params.get("limit") as string)

        const skip = ((current_page - 1) * limit);

        await connectToDatabase();

        // Fetch total count of pins for pagination
        const totalPins = await Pin.countDocuments({});
        const totalPages = Math.ceil(totalPins / limit);

        // Fetch pins sorted by creation date descending, paginated properly
        const pins = await Pin.find({})
            .select(['-like', '-photoId'])
            .sort({ createdAt: -1 }) // sort newest first
            .skip(skip)
            .limit(limit)
            .lean(); // faster & returns plain JS objects

        return NextResponse.json({ pins, total_page: totalPages, current_page: current_page });

    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: "Server error occurred" }, { status: 500 });
    }
}
