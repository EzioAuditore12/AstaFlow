import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    videoFile: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    duration: {
        type: Number,
        required: true
    },
    views: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

export const Video = mongoose.model("Video", videoSchema);