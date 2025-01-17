import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { processVideo } from "../utils/videoProcessor.util.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { Video } from "../models/video.model.js"

const uploadVideo = asyncHandler(async (req, res) => {
    const { title, description } = req.body;
    
    // Check for required files
    if (!req.files?.video?.[0]) throw new ApiError(400, "Video file is required");
    if (!req.files?.thumbnail?.[0]) throw new ApiError(400, "Thumbnail is required");
    if (!req.files?.posterImage?.[0]) throw new ApiError(400, "Poster image is required");

    // Upload thumbnail and poster to Cloudinary
    const thumbnail = await uploadOnCloudinary(req.files.thumbnail[0].path);
    const posterImage = await uploadOnCloudinary(req.files.posterImage[0].path);

    if (!thumbnail || !posterImage) {
        throw new ApiError(500, "Error uploading images to cloudinary");
    }

    // Process video for different qualities
    const processedVideos = await processVideo(req.files.video[0].path);
    
    // Create video document
    const video = await Video.create({
        title,
        description,
        videoFiles: processedVideos,
        thumbnail: thumbnail.url,
        posterImage: posterImage.url,
        owner: req.user._id,
        duration: processedVideos[0]?.duration || 0
    });

    return res.status(201).json(
        new ApiResponse(201, video, "Video uploaded successfully")
    );
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

export {
    uploadVideo,
    streamVideo
}