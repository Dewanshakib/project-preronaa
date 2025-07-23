
import cloudinary from "@/lib/cloudinary";
import { connectToDatabase } from "@/lib/db";
import { editPinSchema } from "@/lib/schema";
import Pin, { IPin } from "@/models/Pin";
import { generateContent } from "@/utils/generateContent";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
    try {

        const formData = await request.formData()
        const image = formData.get("image") as File | undefined
        const pinId = formData.get("pinId") as string

        const userInput = {
            caption: formData.get("caption") as string,
        }

        const parsed = editPinSchema.safeParse(userInput)

        if (!parsed.success) {
            return NextResponse.json({ message: parsed.error.flatten().fieldErrors }, { status: 400 })
        }

        await connectToDatabase()

        const pin = await Pin.findById(pinId) as IPin
        if (!pin) {
            return NextResponse.json({ message: "No pin found" }, { status: 400 });
        }

        if (image) {
            // image -> bytes -> buffer
            const bytes = await image?.arrayBuffer()
            const buffer = Buffer.from(bytes)

            const imageFile = generateContent(image, buffer)
            if (imageFile) {
                const cloud = await cloudinary.uploader.upload(imageFile)

                // when new image comes delete previous image from user
                if (cloud.public_id !== pin.photoId) {
                    if (pin.photoId) {
                        await cloudinary.uploader.destroy(pin.photoId as string)
                    }

                }

                if (cloud) {
                    pin.photoUrl = cloud.secure_url
                    pin.photoId = cloud.public_id
                } else {
                    return NextResponse.json({ message: "Error while uploading to cloudinary" }, { status: 400 })
                }
            }
        }


        pin.caption = parsed.data.caption || pin.caption;
        await pin.save()


        return NextResponse.json({ message: "Pin updated successfully" }, { status: 201 })
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 })
        }
        return NextResponse.json({ error: "Server error occured" }, { status: 500 })
    }
}