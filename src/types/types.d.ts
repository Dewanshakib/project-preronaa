import { Connection } from "mongoose"


declare global {
    var mongoose: {
        conn: Connection<mongoose.connection> | null,
        promise: Promise<mongoose.promise> | null
    }
}

export { }


export interface IUserDetails {
    _id: string;
    name: string;
    username: string;
    email: string;
    avater: string | null;
    avaterId: string | null;
    bio: string | null;
    follower: [];
    following: [];
}

export interface IPinDetails {
    _id: string;
    caption: string;
    photoUrl: string,
    like: [],
    creatorId: string,
}