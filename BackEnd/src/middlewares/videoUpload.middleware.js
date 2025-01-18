import multer from "multer"
import { v4 as uuidv4 } from "uuid"
import path from "path"
import fs from 'fs'

// Ensure upload directory exists
if (!fs.existsSync('./uploads')) {
    fs.mkdirSync('./uploads', { recursive: true })
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.fieldname === 'video') {
            cb(null, './uploads')
        } else {
            cb(null, './public/temp') // For thumbnail and posterImage
        }
    },
    filename: function (req, file, cb) {
        const uniqueFileName = `${uuidv4()}${path.extname(file.originalname)}`
        cb(null, uniqueFileName)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.fieldname === 'video') {
        const allowedTypes = ['video/mp4', 'video/webm', 'video/quicktime']
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true)
        } else {
            cb(new Error('Invalid video format. Only mp4, webm and mov files are allowed'), false)
        }
    } else if (file.fieldname === 'thumbnail' || file.fieldname === 'posterImage') {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true)
        } else {
            cb(new Error('Invalid image format. Only jpeg, png and webp files are allowed'), false)
        }
    } else {
        cb(new Error('Unexpected field'), false)
    }
}

export const videoUpload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: file => {
            if (file.fieldname === 'video') {
                return 500 * 1024 * 1024 // 500MB for videos
            }
            return 5 * 1024 * 1024 // 5MB for images
        }
    }
})