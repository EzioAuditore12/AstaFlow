import ffmpeg from 'fluent-ffmpeg'
import { v4 as uuidv4 } from "uuid"
import path from "path"
import fs from 'fs'

const getVideoDuration = (filePath) => {
    return new Promise((resolve, reject) => {
        ffmpeg.ffprobe(filePath, (err, metadata) => {
            if (err) {
                console.error('Error getting video duration:', err)
                reject(err)
            }
            resolve(metadata.format.duration)
        })
    })
}

export const processVideo = async (inputPath) => {
    console.log('Starting video processing with input path:', inputPath)
    
    // Ensure uploads directory exists
    const uploadsDir = './uploads'
    if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true })
    }

    const videoId = uuidv4()
    const qualities = [
        { name: '720p', height: 720 },
        { name: '480p', height: 480 },
        { name: '360p', height: 360 }
    ]

    try {
        const duration = await getVideoDuration(inputPath)
        console.log('Video duration:', duration)

        const processedVideos = await Promise.all(qualities.map(async (quality) => {
            const outputPath = path.join(uploadsDir, `${videoId}_${quality.name}.mp4`)
            console.log(`Processing ${quality.name} version to:`, outputPath)

            return new Promise((resolve, reject) => {
                ffmpeg(inputPath)
                    .size(`?x${quality.height}`)
                    .videoBitrate('1000k')
                    .audioBitrate('128k')
                    .format('mp4')
                    .on('start', () => {
                        console.log(`Started processing ${quality.name} version`)
                    })
                    .on('progress', (progress) => {
                        console.log(`Processing ${quality.name}: ${progress.percent}% done`)
                    })
                    .on('end', () => {
                        console.log(`Finished processing ${quality.name} version`)
                        const fileStats = fs.statSync(outputPath)
                        resolve({
                            quality: quality.name,
                            path: outputPath,
                            url: `/uploads/${path.basename(outputPath)}`,
                            size: fileStats.size,
                            duration
                        })
                    })
                    .on('error', (err) => {
                        console.error(`Error processing ${quality.name} version:`, err)
                        reject(err)
                    })
                    .save(outputPath)
            })
        }))

        console.log('All video processing completed successfully')
        console.log('Processed videos:', processedVideos)
        
        // Clean up input file
        await fs.promises.unlink(inputPath)
        
        return processedVideos
    } catch (error) {
        console.error('Video processing error:', error)
        // Clean up any failed files
        try {
            await fs.promises.unlink(inputPath)
        } catch (cleanupError) {
            console.error('Error cleaning up input file:', cleanupError)
        }
        throw error
    }
}