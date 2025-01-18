import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { processVideo } from "../utils/videoProcessor.util.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { Video } from "../models/video.model.js"
import fs from 'fs/promises';
import path from 'path';

const uploadVideo = asyncHandler(async (req, res) => {
    const files = [];
    try {
        const { title, description, categories } = req.body;
        
        // Validate categories
        let parsedCategories;
        try {
            parsedCategories = JSON.parse(categories);
            if (!Array.isArray(parsedCategories) || parsedCategories.length === 0) {
                throw new ApiError(400, "At least one category is required");
            }
        } catch (error) {
            throw new ApiError(400, "Invalid categories format");
        }

        // Check for required files
        if (!req.files?.video?.[0]) throw new ApiError(400, "Video file is required");
        if (!req.files?.thumbnail?.[0]) throw new ApiError(400, "Thumbnail is required");
        if (!req.files?.posterImage?.[0]) throw new ApiError(400, "Poster image is required");

        // Keep track of uploaded files for cleanup in case of error
        files.push(req.files.video[0].path);
        files.push(req.files.thumbnail[0].path);
        files.push(req.files.posterImage[0].path);

        // Upload files and create video document
        const thumbnail = await uploadOnCloudinary(req.files.thumbnail[0].path);
        if (!thumbnail) throw new ApiError(500, "Error uploading thumbnail");

        const posterImage = await uploadOnCloudinary(req.files.posterImage[0].path);
        if (!posterImage) throw new ApiError(500, "Error uploading poster image");

        const processedVideos = await processVideo(req.files.video[0].path);
        if (!processedVideos?.length) throw new ApiError(500, "Error processing video");

        const video = await Video.create({
            title,
            description,
            videoFiles: processedVideos,
            thumbnail: thumbnail.url,
            posterImage: posterImage.url,
            owner: req.user._id,
            duration: processedVideos[0]?.duration || 0,
            categories: parsedCategories
        });

        return res.status(201).json(
            new ApiResponse(201, {
                videoId: video._id,
                video
            }, "Video uploaded successfully")
        );
    } catch (error) {
        // Cleanup temporary files in case of error
        await Promise.all(
            files.map(file => 
                fs.unlink(file).catch(err => 
                    console.error(`Error deleting file ${file}:`, err)
                )
            )
        );
        throw error;
    }
});

const streamVideo = asyncHandler(async (req, res) => {
    const { videoId, quality } = req.params
    const range = req.headers.range

    if (!range) {
        throw new ApiError(400, "Range header is required")
    }

    const videoPath = `./uploads/${videoId}_${quality}.mp4`
    const videoSize = fs.statSync(videoPath).size
    const CHUNK_SIZE = 10 ** 6 // 1MB
    const start = Number(range.replace(/\D/g, ""))
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1)
    const contentLength = end - start + 1

    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4",
    }

    res.writeHead(206, headers)
    const videoStream = fs.createReadStream(videoPath, { start, end })
    videoStream.pipe(res)
})

const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    
    const video = await Video.findById(videoId)
        .populate('owner', 'username avatar')
        .populate('categories');
    
    if (!video) {
        throw new ApiError(404, "Video not found");
    }

    return res.status(200).json(
        new ApiResponse(200, video, "Video fetched successfully")
    );
});

export {
    uploadVideo,
    streamVideo,
    getVideoById
}