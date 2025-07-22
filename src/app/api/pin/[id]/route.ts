import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import Pin, { IPin } from "@/models/Pin";
import { connectToDatabase } from "@/lib/db";
import cloudinary from "@/lib/cloudinary";
import isValidated from "@/utils/isValidated";


export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {

        if (!await isValidated()) {
                    return NextResponse.json({ message: "Unauthorized" }, { status: 400 })
        }

        const id = (await params).id

        await connectToDatabase()

        const pins = await Pin.findById(id).populate({
            path: 'creator',
            select: '-password'
        })

        return NextResponse.json(pins, { status: 200 })

    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 })
        }
        return NextResponse.json({ error: "Server error occured" }, { status: 500 })

    }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {

    try {

        if (!await isValidated()) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 400 })
        }

        const pinId = (await params).id

        await connectToDatabase()

        const pin = await Pin.findById(pinId) as IPin
        if (!pin) {
            return NextResponse.json({ message: "No pin found" }, { status: 400 })
        }

        // first delete the image from cloudinary
        const cloud = await cloudinary.uploader.destroy(pin.photoId)
        if (!cloud) {
            return NextResponse.json({ message: "Error occured while deleting photo from cloudinary" }, { status: 400 })
        }


        await Pin.findByIdAndDelete(pinId)

        return NextResponse.json({ message: "Pin deleted successfully" }, { status: 200 })

    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 })
        }
        return NextResponse.json({ error: "Server error occured" }, { status: 500 })

    }
}