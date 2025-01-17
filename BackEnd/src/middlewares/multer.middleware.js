import multer from "multer";
import fs from 'fs';
import path from 'path';

// Ensure directories exist
const createRequiredDirectories = () => {
    const dirs = [
        './public',
        './public/temp',
        './uploads'
    ];

    dirs.forEach(dir => {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
    });
};

// Create directories on startup
createRequiredDirectories();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/temp')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExtension = file.originalname.split('.').pop();
        cb(null, `${file.fieldname}-${uniqueSuffix}.${fileExtension}`);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.fieldname === "video") {
        const allowedTypes = ['video/mp4', 'video/webm', 'video/quicktime'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid video format. Only mp4, webm and mov files are allowed'), false);
        }
    } else if (file.fieldname === "thumbnail" || file.fieldname === "posterImage") {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid image format. Only jpeg, png and webp files are allowed'), false);
        }
    } else {
        cb(null, true);
    }
};

export const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 500 * 1024 * 1024 // 500MB limit
    }
});