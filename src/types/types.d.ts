import { Connection } from "mongoose"


declare global {
    var mongoose: {
        conn: Connection<mongoose.connection> | null,
        promise: Promise<mongoose.promise> | null
    }
}

export { }


export interface IUserDetails {
    name: string,
    username: string,
    email: string,
    image: string | null,
    _id: string,
    bio: string | null,
    follower: [],
    following: []
}