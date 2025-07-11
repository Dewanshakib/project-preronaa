import { connectToDatabase } from '@/lib/db';
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "./schema";
import User from "@/models/User";
import bcrypt from "bcryptjs";


export const authOptions: NextAuthOptions = {
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { type: "email", label: "Email", placeholder: "dewanshakib@gmail.com" },
                password: { type: "password", label: "Password", placeholder: "************" },
            },
            async authorize(credentials) {


                const parsed = loginSchema.safeParse(credentials)
                if (!parsed.success) {
                    throw new Error("Check your email or password")
                }
                await connectToDatabase()

                const user = await User.findOne({ email: parsed.data.email })
                if (!user) {
                    throw new Error("User not found")
                }

                const isMatched = await bcrypt.compare(parsed.data.password, user.password)
                if (!isMatched) {
                    throw new Error("Invalid Credentials")
                }

                return {
                    id: user._id.toString(),
                    username: user.username,
                    email: user.email,
                    avater: user.avater || null,
                    bio: user.bio || null,
                    follower: user.follower,
                    following: user.following,
                }

            },
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
        maxAge: 7 * 24 * 3600
    },
    pages: {
        signIn: "/login",
        error: "/login"
    },
    callbacks: {
        async jwt({ user, token }) {
            if (user) {
                token.id = user.id
                token.username = user.username
                token.picture = user.avater
                token.bio = user.bio
                token.follower = user.follower as []
                token.following = user.following as []
            }
            return token
        },
        async session({ token, session }) {
            if (token) {
                session.user.id = token.id as string
                session.user.name = token.username as string
                session.user.image = token.picture as string
                session.user.bio = token.bio as string
                session.user.follower = token.follower as []
                session.user.following = token.following as []
            }
            return session
        }


    }
}