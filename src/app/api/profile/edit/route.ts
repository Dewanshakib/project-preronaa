import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import User, { IUser } from "@/models/User";
import { editProfileSchema } from "@/lib/schema";
import { generateContent } from "@/utils/generateContent";
import cloudinary from "@/lib/cloudinary";
import { connectToDatabase } from "@/lib/db";


export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const userId = formData.get("userId") as string | null;

        if (!userId) {
            return NextResponse.json({ error: "User ID is missing" }, { status: 400 });
        }

        const userInput = {
            name: formData.get("name") as string,
            bio: formData.get("bio") as string || undefined,
        };

        const parsed = editProfileSchema.safeParse(userInput);
        if (!parsed.success) {
            return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 });
        }

        await connectToDatabase()

        const user = await User.findById(userId) as IUser;
        if (!user) {
            return NextResponse.json({ error: "No user found" }, { status: 400 });
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
                    return NextResponse.json({ error: "Error while uploading to cloudinary" }, { status: 400 })
                }
            }
        }


        user.name = parsed.data.name;
        user.bio = parsed.data.bio || user.bio;

        await user.save();

        return NextResponse.json({ message: "Profile updated successfully" }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message || "Something went wrong" }, { status: 500 });

    }
}