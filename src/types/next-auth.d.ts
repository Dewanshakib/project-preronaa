import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            bio: string;
            follower: Array;
            following: Array;
        } & DefaultSession["user"]
    }

    interface User {
        id: string
        username: string;
        avater: string;
        bio: string;
        follower: Array;
        following: Array;
    }

    interface JWT {
        id: string;
    }



}