import {model,models,Schema,Document} from "mongoose"

export interface IComment extends Document {
    comment:string;
    creator:Schema.Types.ObjectId;
    pinId:Schema.Types.ObjectId;
} 

const CommentSchema = new Schema<IComment>({
    comment:{type:String,required:true},
    creator:{type:Schema.Types.ObjectId,required:true,ref:"User"},
    pinId:{type:Schema.Types.ObjectId,required:true,ref:"Pin"},
},{timestamps:true})

const Comment = models?.Comment || model<IComment>("Comment",CommentSchema)
export default Comment;