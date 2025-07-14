import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import Pin from "@/models/Pin";
import { createPinSchema } from "@/lib/schema";
import { generateContent } from "@/utils/generateContent";
import cloudinary from "@/lib/cloudinary";

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
            return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 })
        }

        // image -> buffer
        const bytes = await image.arrayBuffer()
        const buffer = Buffer.from(bytes)

        // image parsed
        const imageContent = generateContent(image, buffer)

        // upload to cloudinary
        if (imageContent) {
            const photo = await cloudinary.uploader.upload(imageContent)
            await Pin.create({
                creatorId,
                caption: parsed.data.caption,
                photoId: photo.public_id,
                photoUrl: photo.secure_url
            })

        } else {
            return NextResponse.json({ error: "Error while uploading to cloudinary" }, { status: 400 })
        }

        return NextResponse.json({ message: "Pin posted successfully" }, { status: 201 })
    } catch (error: any) {
        return NextResponse.json({ error: error.error }, { status: 500 })
    }
}