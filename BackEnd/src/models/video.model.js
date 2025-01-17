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
    videoFiles: [{
        quality: String,
        path: String,
        url: String
    }],
    thumbnail: {
        type: String,
        required: [true, 'Thumbnail is required']
    },
    posterImage: {
        type: String,
        required: [true, 'Poster image is required']
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
    }],
    tags: [{
        type: String,
        trim: true
    }]
}, { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

// Add indexes for better search performance
videoSchema.index({ title: 'text', description: 'text', tags: 'text' });

// Virtual for comments
videoSchema.virtual('comments', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'video'
});

videoSchema.methods.incrementViews = async function() {
    this.views += 1;
    return await this.save();
}

export const Video = mongoose.model('Video', videoSchema)