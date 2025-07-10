import User, { IUser } from "@/models/User";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";


export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params

        const user = await User.findById(id).select("-password") as IUser
        if (!user) {
            return NextResponse.json({ error: "No user found with this id" }, { status: 400 })
        }


        return NextResponse.json(user, { status: 200 })
    } catch (error:any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}