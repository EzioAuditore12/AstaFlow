import ffmpeg from 'fluent-ffmpeg'
import { v4 as uuidv4 } from "uuid"
import path from "path"

export const processVideo = async (inputPath) => {
    const qualities = [
        { name: "1080p", height: 1080 },
        { name: "720p", height: 720 },
        { name: "480p", height: 480 },
        { name: "360p", height: 360 }
    ]

    const outputFiles = []

    for (const quality of qualities) {
        const outputFileName = `${uuidv4()}_${quality.name}.mp4`
        const outputPath = path.join('./uploads', outputFileName)

        await new Promise((resolve, reject) => {
            ffmpeg(inputPath)
                .size(`?x${quality.height}`)
                .videoBitrate('1000k')
                .outputOptions(['-c:v h264', '-c:a aac'])
                .output(outputPath)
                .on('end', () => {
                    outputFiles.push({
                        quality: quality.name,
                        path: outputPath
                    })
                    resolve()
                })
                .on('error', reject)
                .run()
        })
    }

    return outputFiles
}