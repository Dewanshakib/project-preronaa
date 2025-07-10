import { Connection } from "mongoose"


declare global {
    var mongoose: {
        conn: Connection<mongoose.connection> | null,
        promise: Promise<mongoose.promise> | null
    }
}

export {}