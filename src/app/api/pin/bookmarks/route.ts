
import { connectToDatabase } from "@/lib/db";
import User, { IUser } from "@/models/User";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    try {


        const { userId, pinId } = await request.json()

        if (!userId) {
            return NextResponse.json({ message: "No user id found" }, { status: 400 })
        }

        await connectToDatabase()


        const user = await User.findById(userId) as IUser
        if (!user) {
            return NextResponse.json({ message: "No user found" }, { status: 400 })
        }

        if (user.bookmarks?.includes(pinId)) {
            await User.findByIdAndUpdate(userId, { $pull: { bookmarks: pinId } })
            return NextResponse.json({ message: "You removed bookmark from this pin" }, { status: 200 })
        } else {
            await User.findByIdAndUpdate(userId, { $push: { bookmarks: pinId } })
            return NextResponse.json({ message: "You bookmarked this pin" }, { status: 200 })
        }



    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 })
        }
        return NextResponse.json({ error: "Server error occured" }, { status: 500 })
    }
}