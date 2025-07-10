import { model, models, Document, Schema } from "mongoose"

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    avater?: string;
    resetToken?: string;
    resetTokenExpiry?: Date;
    follower?: [],
    following?: [],
    bookmarks?: []
}

const UserSchema = new Schema<IUser>({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avater: { type: String, required: false },
    resetToken: { type: String, required: false },
    resetTokenExpiry: { type: Date, required: false },
    follower: { type: Array, default: [], required: false },
    following: { type: Array, default: [], required: false },
    bookmarks: { type: Array, default: [], required: false }
})

const User = models.User || model<IUser>("User", UserSchema)
export default User