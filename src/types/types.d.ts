import { Connection } from "mongoose"


declare global {
    var mongoose: {
        conn: Connection<mongoose.connection> | null,
        promise: Promise<mongoose.promise> | null
    }
}

export { }


export interface ISession {
    name: string,
    email: string,
    image: string | null,
    id: string,
    bio: string | null,
    follower: [],
    following: []
}