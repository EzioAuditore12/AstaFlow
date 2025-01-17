import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from '../utils/ApiError.js'
import jwt from 'jsonwebtoken'
import {User} from '../models/user.model.js'

export const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        console.log('Auth Request:', {
            cookies: req.cookies,
            headers: req.headers,
            token: token ? 'exists' : 'missing'
        });
        
        if (!token) {
            throw new ApiError(401, "Unauthorized request - No token provided");
        }
  
        try {
            const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            console.log('Token verification successful:', { userId: decodedToken._id });
            
            if (!decodedToken?._id) {
                throw new ApiError(401, "Invalid token format");
            }

            const user = await User.findById(decodedToken._id).select("-password -refreshToken");
            console.log('User lookup result:', user ? 'Found' : 'Not found');
            
            if (!user) {
                throw new ApiError(401, "User not found");
            }
            
            req.user = user;
            next();
        } catch (jwtError) {
            console.error('JWT Verification failed:', jwtError);
            throw new ApiError(401, `Token verification failed: ${jwtError.message}`);
        }
    } catch (error) {
        console.error('Auth Middleware Error:', {
            type: error.constructor.name,
            message: error.message,
            stack: error.stack
        });
        throw error;
    }
});