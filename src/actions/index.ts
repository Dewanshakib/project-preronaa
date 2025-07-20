"use server"

import { connectToDatabase } from "@/lib/db";
import Pin from "@/models/Pin";


// getting all pins
export async function getAllPins() {
    await connectToDatabase();
    const pins = await Pin.find().sort({ createdAt: -1 }); // or your model logic
    return JSON.parse(JSON.stringify(pins)); // if using Mongoose
}