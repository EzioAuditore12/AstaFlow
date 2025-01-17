import mongoose, { Schema } from "mongoose";

const videoSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        index: true
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    videoFile: {
        type: String,
        required: [true, 'Video file is required']
    },
    thumbnail: {
        type: String,
        required: [true, 'Thumbnail is required']
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, 'Video owner is required']
    },
    duration: {
        type: Number,
        required: [true, 'Video duration is required']
    },
    views: {
        type: Number,
        default: 0
    },
    categories: [{
        type: Schema.Types.ObjectId,
        ref: "Category"
    }]
}, { timestamps: true })

videoSchema.methods.incrementViews = async function() {
    this.views += 1;
    return await this.save();
}

export const Video = new mongoose.model('Video', videoSchema)