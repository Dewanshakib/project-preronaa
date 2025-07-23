
import { connectToDatabase } from "@/lib/db";
import Pin from "@/models/Pin";
import User, { IUser } from "@/models/User";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {

    try {

        const userId = (await params).id
        const category = request.nextUrl.searchParams.get("category")
        const current_page = parseInt(request.nextUrl.searchParams.get("page") as string)
        const limit = parseInt(request.nextUrl.searchParams.get("limit") as string)

        const skip = ((current_page - 1) * limit)


        if (!userId) {
            return NextResponse.json({ message: "No user id found!" }, { status: 400 })
        }

        await connectToDatabase()

        // }

        const allPinsCount = await Pin.find({ creator: userId }).countDocuments({})
        const userPins = await Pin.find({ creator: userId })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean();

        if (!userPins) {
            return NextResponse.json({ message: "No pins found" }, { status: 400 })

        }


        // if category exists
        if (category === "bookmarks") {
            const user = await User.findById(userId) as IUser
            const userBookmarkedPinIds = user.bookmarks // array of ids 
            const bookmarkedPinCount = await Pin.find({ _id: { $in: userBookmarkedPinIds } }).countDocuments({})
            const bookmarkedPins = await Pin.find({ _id: { $in: userBookmarkedPinIds } }).skip(skip).limit(limit).lean()
            const total_page = Math.ceil((bookmarkedPinCount / limit))

            // console.log(bookmarkedPins)
            return NextResponse.json({ pins: bookmarkedPins, total_page, current_page }, { status: 200 })
        }

        const total_page = Math.ceil((allPinsCount / limit))

        return NextResponse.json({ pins: userPins, total_page, current_page }, { status: 200 })
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 })
        }
        return NextResponse.json({ error: "Server error occured" }, { status: 500 })
    }

}