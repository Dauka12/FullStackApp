import mongoose from "mongoose";

const PostSchema = mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    description:{
        type:String,
        required: true
    } 
},{
    timestamps:true
});
export default mongoose.model('Post', PostSchema)