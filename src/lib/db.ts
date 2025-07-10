import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI!

if (!MONGODB_URI) {
    throw new Error("Please define mongodb uri in .env file")
}

let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

export async function connectToDatabase() {

    // if cached
    if (cached.conn) {
        return cached.conn
    }

    // promise on the way 
    if (!cached.promise) {
        // promise options
        const Opts = {
            bufferCommands: false,
            maxPoolSize: 10,
            dbName: "Pinterest"
        }

        // create promise
        cached.promise = mongoose.connect(MONGODB_URI, Opts)

        return cached.promise
    }

    cached.conn = await cached.promise
    return cached.conn;
}
