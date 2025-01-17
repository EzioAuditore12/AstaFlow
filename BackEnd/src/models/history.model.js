import mongoose, { Schema } from "mongoose";

const historySchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, 'User reference is required'],
        index: true
    },
    video: {
        type: Schema.Types.ObjectId,
        ref: "Video",
        required: [true, 'Video reference is required']
    },
    watchedAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

historySchema.index({ user: 1, video: 1 }, { unique: true });

historySchema.methods.updateWatchTime = async function() {
    this.watchedAt = new Date();
    return await this.save();
};

export const History = new mongoose.model('History', historySchema);