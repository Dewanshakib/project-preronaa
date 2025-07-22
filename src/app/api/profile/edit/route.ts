import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import User, { IUser } from "@/models/User";
import { editProfileSchema } from "@/lib/schema";
import { generateContent } from "@/utils/generateContent";
import cloudinary from "@/lib/cloudinary";
import { connectToDatabase } from "@/lib/db";
import isValidated from "@/utils/isValidated";


export async function PUT(request: NextRequest) {
    try {

        if (!await isValidated()) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 400 })
        }

        const formData = await request.formData();
        const userId = formData.get("userId") as string | null;

        if (!userId) {
            return NextResponse.json({ message: "User ID is missing" }, { status: 400 });
        }

        const userInput = {
            name: formData.get("name") as string,
            bio: formData.get("bio") as string || undefined,
        };

        const parsed = editProfileSchema.safeParse(userInput);
        if (!parsed.success) {
            return NextResponse.json({ message: parsed.error.flatten().fieldErrors }, { status: 400 });
        }

        await connectToDatabase()

        const user = await User.findById(userId) as IUser;
        if (!user) {
            return NextResponse.json({ message: "No user found" }, { status: 400 });
        }

        const image = formData.get("avater") as File | undefined

        if (image) {
            // image -> bytes -> buffer
            const bytes = await image?.arrayBuffer()
            const buffer = Buffer.from(bytes)

            const imageFile = generateContent(image, buffer)
            if (imageFile) {
                const cloud = await cloudinary.uploader.upload(imageFile)

                // when new image comes delete previous image from user
                if (cloud.public_id !== user.avaterId) {
                    if (user.avaterId) {
                        await cloudinary.uploader.destroy(user.avaterId as string)
                    }

                }

                if (cloud) {
                    user.avater = cloud.secure_url
                    user.avaterId = cloud.public_id
                } else {
                    return NextResponse.json({ message: "Error while uploading to cloudinary" }, { status: 400 })
                }
            }
        }


        user.name = parsed.data.name || user.name;
        user.bio = parsed.data.bio || user.bio;

        await user.save();

        return NextResponse.json({ message: "Profile updated successfully" }, { status: 201 });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 })
        }
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });

    }
}