import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import User from "@/models/User";



export async function POST(request:NextRequest) {
    const body = await request.json()
    console.log(body)
    // return NextResponse.json("Ok")
}