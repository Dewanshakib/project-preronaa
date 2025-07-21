import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import Pin from "@/models/Pin";
import { connectToDatabase } from "@/lib/db";

export async function GET(request: NextRequest) {
    try {
        // Extract query params safely with defaults and validation
        const { searchParams } = new URL(request.url);
        const pageRaw = searchParams.get("page");
        const limitRaw = searchParams.get("limit");

        // Parse page and limit with sane defaults and boundaries
        const page = Math.max(1, parseInt(pageRaw || "1")); // page >= 1
        const limit = Math.min(50, Math.max(1, parseInt(limitRaw || "10"))); // limit between 1 and 50

        const skip = (page - 1) * limit;

        await connectToDatabase();

        // Fetch total count of pins for pagination
        const totalPins = await Pin.countDocuments({});
        const totalPages = Math.ceil(totalPins / limit);

        // Fetch pins sorted by creation date descending, paginated properly
        const pins = await Pin.find({})
            .sort({ createdAt: -1 }) // sort newest first
            .skip(skip)
            .limit(limit)
            .lean(); // faster & returns plain JS objects

        return NextResponse.json({ pins, totalPages, page, limit });

    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: "Server error occurred" }, { status: 500 });
    }
}
