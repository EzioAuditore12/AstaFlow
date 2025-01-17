import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { processVideo } from "../utils/videoProcessor.util.js"
import fs from "fs"

const uploadVideo = asyncHandler(async (req, res) => {
    const videoFile = req.file
    if (!videoFile) {
        throw new ApiError(400, "Video file is required")
    }

    const processedVideos = await processVideo(videoFile.path)
    
    // Save video metadata to database
    const video = {
        title: req.body.title,
        description: req.body.description,
        qualities: processedVideos,
        originalName: videoFile.originalname,
        uploadedBy: req.user._id
    }

    return res.status(201).json(
        new ApiResponse(201, video, "Video uploaded successfully")
    )
})

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