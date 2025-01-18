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
        console.log("Starting video upload process...");
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

        console.log("All required files present. Starting file processing...");

        // Keep track of uploaded files for cleanup in case of error
        files.push(req.files.video[0].path);
        files.push(req.files.thumbnail[0].path);
        files.push(req.files.posterImage[0].path);

        // Upload files and create video document
        console.log("Uploading thumbnail to Cloudinary...");
        const thumbnail = await uploadOnCloudinary(req.files.thumbnail[0].path);
        if (!thumbnail) throw new ApiError(500, "Error uploading thumbnail");
        console.log("Thumbnail uploaded successfully");

        console.log("Uploading poster image to Cloudinary...");
        const posterImage = await uploadOnCloudinary(req.files.posterImage[0].path);
        if (!posterImage) throw new ApiError(500, "Error uploading poster image");
        console.log("Poster image uploaded successfully");

        console.log("Starting FFmpeg video processing...");
        console.log("Video file path:", req.files.video[0].path);
        
        const processedVideos = await processVideo(req.files.video[0].path);
        if (!processedVideos?.length) {
            console.error("No processed videos returned");
            throw new ApiError(500, "Error processing video");
        }
        
        console.log("FFmpeg processing completed successfully!");
        console.log("Processed videos:", processedVideos);

        // Format video files for response
        const videoFiles = processedVideos.map(video => ({
            quality: video.quality,
            url: video.url,
            size: video.size,
            duration: video.duration
        }));

        console.log("Creating video document in database...");
        const video = await Video.create({
            title,
            description,
            videoFiles,
            thumbnail: thumbnail.url,
            posterImage: posterImage.url,
            owner: req.user._id,
            duration: videoFiles[0]?.duration || 0,
            categories: parsedCategories,
            views: 0,
            likes: [],
            comments: []
        });

        // Populate owner details for the response
        const populatedVideo = await Video.findById(video._id)
            .populate('owner', 'username avatar fullName')
            .lean();

        // Format the response
        const responseData = {
            videoId: video._id,
            title: populatedVideo.title,
            description: populatedVideo.description,
            videoFiles: populatedVideo.videoFiles,
            thumbnail: populatedVideo.thumbnail,
            posterImage: populatedVideo.posterImage,
            duration: populatedVideo.duration,
            views: populatedVideo.views,
            categories: populatedVideo.categories,
            owner: populatedVideo.owner,
            createdAt: populatedVideo.createdAt
        };

        return res.status(201).json(
            new ApiResponse(201, responseData, "Video uploaded successfully")
        );
    } catch (error) {
        console.error("Error in video upload process:", error);
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
        .populate('owner', 'username avatar fullName')
        .lean();
    
    if (!video) {
        throw new ApiError(404, "Video not found");
    }

    // Format response
    const responseData = {
        videoId: video._id,
        title: video.title,
        description: video.description,
        videoFiles: video.videoFiles.map(file => ({
            quality: file.quality,
            url: file.url,
            size: file.size
        })),
        thumbnail: video.thumbnail,
        posterImage: video.posterImage,
        duration: video.duration,
        views: video.views,
        categories: video.categories,
        owner: video.owner,
        createdAt: video.createdAt,
        likes: video.likes.length,
        comments: video.comments.length
    };

    return res.status(200).json(
        new ApiResponse(200, responseData, "Video fetched successfully")
    );
});

export {
    uploadVideo,
    streamVideo,
    getVideoById
}