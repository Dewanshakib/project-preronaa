import { model, models, Document, Schema } from "mongoose"

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    avater?: string;
    resetToken?: string;
    resetTokenExpiry?: Date;
    bio?: string;
    follower?: Array<string>,
    following?: Array<string>,
    bookmarks?: Array<string>
}

const UserSchema = new Schema<IUser>({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avater: { type: String, required: false },
    bio: { type: String, required: false },
    resetToken: { type: String, required: false },
    resetTokenExpiry: { type: Date, required: false },
    follower: { type: Array, required: false },
    following: { type: Array, required: false },
    bookmarks: { type: Array, default: [], required: false }
}, { timestamps: true })

const User = models.User || model<IUser>("User", UserSchema)
export default User