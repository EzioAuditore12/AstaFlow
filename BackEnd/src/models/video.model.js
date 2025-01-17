import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        index: true
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true
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
        type: String,
        required: [true, 'At least one category is required'],
        enum: ['anime', 'movies', 'tvshows', 'gaming', 'music', 'education', 'sports', 'news']
    }],
    tags: [{
        type: String,
        trim: true
    }],
    likes: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    comments: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        content: {
            type: String,
            required: true,
            trim: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }]
}, { 
    timestamps: true 
});

// Indexes for better search performance
videoSchema.index({ title: 'text', description: 'text', categories: 1 });

// Plugin for pagination
videoSchema.plugin(mongooseAggregatePaginate);

// Methods
videoSchema.methods.incrementViews = async function() {
    this.views += 1;
    return await this.save();
};

videoSchema.methods.addComment = async function(userId, content) {
    this.comments.push({ user: userId, content });
    return await this.save();
};

videoSchema.methods.toggleLike = async function(userId) {
    const userLikeIndex = this.likes.indexOf(userId);
    if (userLikeIndex === -1) {
        this.likes.push(userId);
    } else {
        this.likes.splice(userLikeIndex, 1);
    }
    return await this.save();
};

export const Video = mongoose.model('Video', videoSchema);