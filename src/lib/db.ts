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

    try {
        if (cached.conn) {
            return cached.conn
        }

        if (!cached.promise) {
            const Opts = {
                bufferCommands: false,
                maxPoolSize: 10,
                dbName: "Pinterest"
            }

            cached.promise = mongoose.connect(MONGODB_URI, Opts)
        }

        cached.conn = await cached.promise
        return cached.conn
    } catch (error) {
        throw error
    }
}
