import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import Pin from "@/models/Pin";
import { createPinSchema } from "@/lib/schema";
import { generateContent } from "@/utils/generateContent";
import cloudinary from "@/lib/cloudinary";
import { connectToDatabase } from "@/lib/db";

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData()
        const image = formData.get("image") as File
        const creatorId = formData.get("creatorId")
        
        const userInput = {
            caption: formData.get("caption") as string,
        }

        const parsed = createPinSchema.safeParse(userInput)

        if (!parsed.success) {
            return NextResponse.json({ message: parsed.error.flatten().fieldErrors }, { status: 400 })
        }

        // image -> buffer
        const bytes = await image.arrayBuffer()
        const buffer = Buffer.from(bytes)

        await connectToDatabase()



        // image parsed
        const imageContent = generateContent(image, buffer)

        // upload to cloudinary
        if (imageContent) {
            const photo = await cloudinary.uploader.upload(imageContent)
            await Pin.create({
                creator: creatorId,
                caption: parsed.data.caption,
                photoId: photo.public_id,
                photoUrl: photo.secure_url
            })

        } else {
            return NextResponse.json({ message: "Error while uploading to cloudinary" }, { status: 400 })
        }

        return NextResponse.json({ message: "Pin posted successfully" }, { status: 201 })
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 })
        }
        return NextResponse.json({ error: "Server error occured" }, { status: 500 })
    }
}