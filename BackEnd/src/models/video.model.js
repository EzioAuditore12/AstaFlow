import mongoose,{Schema} from "mongoose";

const videoSchema=new Schema({
    videoFile:{
        type:String, // from a cloudanary url because of 
        required:true
    },
    thumbnail:{
        type:String,
        required:true
    },
    title:{
        type:String, 
        required:true
    },
    description:{
        type:Number,
        required:true
    },
    views:{
        type:Number,
        default:0
    },
    isPublished:{
        type:Boolean,
        default: true
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }
},{timestamps:true})

export const Video=new mongoose.model('Video',videoSchema)