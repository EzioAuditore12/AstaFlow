import multer from "multer"
import { v4 as uuidv4 } from "uuid"
import path from "path"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        const uniqueFileName = `${uuidv4()}${path.extname(file.originalname)}`
        cb(null, uniqueFileName)
    }
})

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['video/mp4', 'video/webm', 'video/quicktime']
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(new Error('Invalid file type. Only mp4, webm and mov files are allowed'), false)
    }
}

export const videoUpload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 500 * 1024 * 1024 } // 500MB limit
})