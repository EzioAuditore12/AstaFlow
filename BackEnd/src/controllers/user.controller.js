import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const generateAccessAndRefereshTokens = async(userId) =>{
  try {
      const user = await User.findById(userId)
      const accessToken = user.generateAccessToken()
      const refreshToken = user.generateRefreshToken()

      user.refreshToken = refreshToken
      await user.save({ validateBeforeSave: false })

      return {accessToken, refreshToken}


  } catch (error) {
      throw new ApiError(500, "Something went wrong while generating referesh and access token")
  }
}

const registerUser = asyncHandler(async (req, res) => {
  //1.Get the user details from frontEnd

  const { fullName, email, username, password } = req.body;

  //2. Check if all the fields are entered

  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  //3. Check if the user alreaady exists throug either email or username

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  //4. Check for files
  console.log("Files received:", req.files); // Add this for debugging

  if (!req.files?.avatar?.[0]?.path) {
    throw new ApiError(400, "Avatar file is required");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  let coverImageLocalPath = req.files?.coverImage?.[0]?.path || "";

  //5. upload both in cloudinary
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = coverImageLocalPath ? await uploadOnCloudinary(coverImageLocalPath) : null;

  if (!avatar) {
    throw new ApiError(400, "Error while uploading avatar");
  }

  //6. Now create user object and make the entry in db

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  //6. Remove password and refresh token key from response
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  //7. Check if the user is created

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  //8. Return the response
  return res.status(201).json(
    new ApiResponse(200, createdUser, "User registered Successfully")
  );
});

const loginUser = asyncHandler(async (req, res) =>{
  // req body -> data
  // username or email
  //find the user
  //password check
  //access and referesh token
  //send cookie

  const {email, username, password} = req.body
  console.log(email);

  if (!username && !email) {
      throw new ApiError(400, "username or email is required")
  }
  
  // Here is an alternative of above code based on logic discussed in video:
  // if (!(username || email)) {
  //     throw new ApiError(400, "username or email is required")
      
  // }

  const user = await User.findOne({
      $or: [{username}, {email}]
  })

  if (!user) {
      throw new ApiError(404, "User does not exist")
  }

 const isPasswordValid = await user.isPasswordCorrect(password)

 if (!isPasswordValid) {
  throw new ApiError(401, "Invalid user credentials")
  }

 const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(user._id)

  const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

  const options = {
      httpOnly: true,
      secure: true
  }

  return res
  .status(200)
  .cookie("accessToken", accessToken, options)
  .cookie("refreshToken", refreshToken, options)
  .json(
      new ApiResponse(
          200, 
          {
              user: loggedInUser, accessToken, refreshToken
          },
          "User logged in Successfully"
      )
  )

})

const logoutUser = asyncHandler(async(req, res) => {
  await User.findByIdAndUpdate(
      req.user._id,
      {
          $unset: {
              refreshToken: 1 // this removes the field from document
          }
      },
      {
          new: true
      }
  )

  const options = {
      httpOnly: true,
      secure: true
  }

  return res
  .status(200)
  .clearCookie("accessToken", options)
  .clearCookie("refreshToken", options)
  .json(new ApiResponse(200, {}, "User logged Out"))
})

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

  if (!incomingRefreshToken) {
      throw new ApiError(401, "unauthorized request")
  }

  try {
      const decodedToken = jwt.verify(
          incomingRefreshToken,
          process.env.REFRESH_TOKEN_SECRET
      )
  
      const user = await User.findById(decodedToken?._id)
  
      if (!user) {
          throw new ApiError(401, "Invalid refresh token")
      }
  
      if (incomingRefreshToken !== user?.refreshToken) {
          throw new ApiError(401, "Refresh token is expired or used")
          
      }
  
      const options = {
          httpOnly: true,
          secure: true
      }
  
      const {accessToken, newRefreshToken} = await generateAccessAndRefereshTokens(user._id)
  
      return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
          new ApiResponse(
              200, 
              {accessToken, refreshToken: newRefreshToken},
              "Access token refreshed"
          )
      )
  } catch (error) {
      throw new ApiError(401, error?.message || "Invalid refresh token")
  }

})

const getUserDetails = asyncHandler(async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            throw new ApiError(400, "User ID is required");
        }

        const user = await User.findById(userId)
            .select("-password -refreshToken")
            .populate("watchHistory");

        if (!user) {
            throw new ApiError(404, "User not found");
        }

        return res.status(200).json(
            new ApiResponse(200, { user }, "User details fetched successfully")
        );
    } catch (error) {
        throw new ApiError(error.statusCode || 500, error.message || "Error fetching user details");
    }
});

const getUserProfile = asyncHandler(async (req, res) => {
    try {
        console.log('GetUserProfile - Request user:', req.user);
        
        if (!req.user?._id) {
            throw new ApiError(400, "User ID not found in request");
        }

        const user = await User.findById(req.user._id)
            .select("-password -refreshToken")
            .populate({
                path: "watchHistory",
                model: "Video",
                select: "title thumbnail views duration"
            });
        
        console.log('GetUserProfile - Database result:', {
            found: !!user,
            userId: req.user._id,
            watchHistoryCount: user?.watchHistory?.length || 0
        });

        if (!user) {
            throw new ApiError(404, "User not found");
        }

        // Ensure watchHistory is always an array
        user.watchHistory = user.watchHistory || [];

        return res.status(200).json(
            new ApiResponse(200, { user }, "User profile fetched successfully")
        );
    } catch (error) {
        console.error('GetUserProfile - Error:', {
            name: error.name,
            message: error.message,
            stack: error.stack,
            userId: req?.user?._id
        });
        throw error;
    }
});

export { 
    registerUser, 
    loginUser, 
    logoutUser, 
    getUserDetails, 
    getUserProfile 
};