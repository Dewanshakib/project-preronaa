import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
        } & DefaultSession["user"]
    }

    interface User {
        id: string
        username:string;
        avater:string | null
    }

    interface JWT {
        id: string;
    }



}