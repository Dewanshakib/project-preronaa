import { connectToDatabase } from "@/lib/db";
import Pin from "@/models/Pin";
import User, { IUser } from "@/models/User";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {

    try {
        const userId = (await params).id
        const category = request.nextUrl.searchParams.get("category")
        // console.log(category)

        let userPins;

        if (!userId) {
            return NextResponse.json({ error: "No user id found!" }, { status: 400 })
        }

        await connectToDatabase()

        // }


        userPins = await Pin.find({ creator: userId }).sort({createdAt:-1})

        if (!userPins) {
            return NextResponse.json({ error: "No pins found" }, { status: 400 })

        }


        // if category exists
        if (category === "bookmarks") {
            const user = await User.findById(userId) as IUser
            const userBookmarkedPinIds = user.bookmarks // array of ids 
            const bookmarkedPins = await Pin.find({ _id: { $in: userBookmarkedPinIds } }).sort({createdAt:-1})
            // console.log(bookmarkedPins)
            return NextResponse.json(bookmarkedPins, { status: 200 })
        }

        return NextResponse.json(userPins, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: "Server error occured while getting user pins" }, { status: 500 })
    }

}