import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Video } from "../models/video.model.js";
import { Category } from "../models/category.model.js";

const searchVideos = asyncHandler(async (req, res) => {
    const { q, category, sort = "recent" } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;

    const query = {};

    // Text search if query provided
    if (q) {
        query.$text = { $search: q };
    }

    // Category filter
    if (category) {
        query.categories = category;
    }

    // Build sort options
    const sortOptions = {};
    switch (sort) {
        case "views":
            sortOptions.views = -1;
            break;
        case "recent":
        default:
            sortOptions.createdAt = -1;
    }

    const videos = await Video.find(query)
        .populate('owner', 'username avatar')
        .populate('categories', 'name')
        .sort(sortOptions)
        .skip((page - 1) * limit)
        .limit(limit);

    const total = await Video.countDocuments(query);

    return res.status(200).json(
        new ApiResponse(200, {
            videos,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit)
            }
        }, "Videos fetched successfully")
    );
});

export { searchVideos }; 