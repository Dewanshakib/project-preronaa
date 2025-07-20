import { authOptions } from "@/lib/authOptions";
import { connectToDatabase } from "@/lib/db";
import User, { IUser } from "@/models/User";
import { getServerSession } from "next-auth";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function POST(request: NextRequest) {


    try {
        const session = await getServerSession(authOptions)
        const { userId } = await request.json()
        const currentUserId = session?.user.id as string

        await connectToDatabase()

        // check user authenticated or not for security
        if (!currentUserId) {
            return NextResponse.json({ message: "User is not logged in" }, { status: 400 })
        }

        // logic for follow and unfollow
        const currentUser = await User.findById(currentUserId) as IUser
        const user = await User.findById(userId) as IUser

        if (currentUser.following?.includes(userId)) {

            await User.findByIdAndUpdate(currentUserId, {
                $pull: { following: userId }
            }) // myself
            await User.findByIdAndUpdate(userId, {
                $pull: { follower: currentUserId }
            }) // user

            return NextResponse.json({ message: `You unfollowed ${user.username}` }, { status: 200 })

        } else {
            await User.findByIdAndUpdate(currentUserId, {
                $push: { following: userId }
            }) // myself
            await User.findByIdAndUpdate(userId, {
                $push: { follower: currentUserId }
            }) // user

            return NextResponse.json({ message: `You followed ${user.username}` }, { status: 200 })
        }


    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 })
        }
        return NextResponse.json({ error: "Server error occured" }, { status: 500 })
    }
}