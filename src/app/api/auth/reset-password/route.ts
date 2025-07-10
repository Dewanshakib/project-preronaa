import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import User, { IUser } from "@/models/User";
import { resetPasswordSchema } from "@/lib/schema";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/lib/db";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();


        const parsed = resetPasswordSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json(
                { error: parsed.error.flatten().fieldErrors },
                { status: 400 }
            );
        }

        const { token, password } = parsed.data;
        console.log(token)


        await connectToDatabase();


        const user = (await User.findOne({
            resetToken: token,
            resetTokenExpiry: { $gt: new Date() },
        })) as IUser

        if (!user) {
            return NextResponse.json(
                { error: "Invalid or expired token" },
                { status: 400 }
            );
        }


        const hashedNewPassword = await bcrypt.hash(password, 10);


        user.resetToken = undefined;
        user.resetTokenExpiry = undefined;

        user.password = hashedNewPassword;


        await user.save();

        return NextResponse.json(
            { message: "Password updated successfully" },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json(
            {
                error: error.error,
            },
            { status: 500 }
        );
    }
}
