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
    follower: string[];
    following: string[];
    bookmarks: string[];
}

export interface ICreator {
    _id: string;
    username: string;
    email: string;
    avater: string | null;
    name: string;
}

export interface IPinDetails {
    _id: string;
    caption: string;
    photoUrl: string,
    like: string[],
    creator: ICreator,
}

export interface IUserPin {
    _id: string;
    caption: string;
    photoUrl: string;
    photoId: string;
    like: string[];
};

interface User{
    avater:string | null;
    username:string;
    _id:string;
}

export interface ICommentDetails {
    _id: string;
    comment: string;
    creator: User;
    pinId: string;
}