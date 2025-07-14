import { model, models, Schema, Document } from "mongoose"

export interface IPin extends Document {
    caption: string;
    photoUrl: string;
    photoId: string;
    like?: Array<string>;
    creatorId: Schema.Types.ObjectId;
}

const PinSchema = new Schema<IPin>({
    caption: { type: String, required: true },
    photoUrl: { type: String, required: true },
    photoId: { type: String, required: true },
    like: { type: Array, required: false },
    creatorId: { ref: "User", type: Schema.Types.ObjectId }
}, { timestamps: true })

const Pin = models?.Pin || model<IPin>("Pin", PinSchema)
export default Pin;