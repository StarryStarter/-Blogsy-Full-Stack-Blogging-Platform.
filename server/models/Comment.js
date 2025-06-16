import mongoose from "mongoose";
import { type } from "os";
import { ref } from "process";
import { StringDecoder } from "string_decoder";

const commentSchema = new mongoose.Schema({
    blog:{type :mongoose.Schema.Types.ObjectId,ref: 'blog',required: true},
    name:{type: String, required: true},
    content:{type: String, required: true},
    isApproved:{type: Boolean, default: false},
    


},{timestamps:true})

const Comment = mongoose.model('Comment',commentSchema);

export default Comment;