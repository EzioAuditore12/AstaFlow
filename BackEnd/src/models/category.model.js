import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema({
    name: {
        type: String,
        required: [true, 'Category name is required'],
        trim: true,
        index: true
    },
    type: {
        type: String,
        required: [true, 'Category type is required'],
        trim: true
    },
    videos: [{
        type: Schema.Types.ObjectId,
        ref: "Video"
    }]
}, { timestamps: true })

categorySchema.methods.getVideoCount = function() {
    return this.videos.length;
}

export const Category = new mongoose.model('Category', categorySchema)