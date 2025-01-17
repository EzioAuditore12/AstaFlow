import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs/promises';
import { ApiError } from './ApiError.js';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            throw new ApiError(400, "No file provided");
        }

        // Upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        });

        // File has been uploaded successfully
        console.log("File uploaded on cloudinary:", response.url);
        
        // Remove file from local storage
        await fs.unlink(localFilePath);

        return response;
    } catch (error) {
        // Remove the locally saved temporary file as the upload operation failed
        try {
            await fs.unlink(localFilePath);
        } catch (unlinkError) {
            console.error("Error deleting local file:", unlinkError);
        }

        console.error("Cloudinary upload error:", error);
        throw new ApiError(500, "Error uploading file to cloudinary");
    }
};

export { uploadOnCloudinary };
 