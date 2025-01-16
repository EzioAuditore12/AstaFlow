import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import mongoose from "mongoose";

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

  //4. Check if user has entered profile photo which is mandotry and optinally coverImage

  const avatarLocalPath = req.files?.avatar[0]?.path;
  //const coverImageLocalPath = req.files?.coverImage[0]?.path;

  let coverImageLocalPath;
  if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
    coverImageLocalPath = req.files.coverImage[0].path;
  }

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  //5. upload both in cloudinary
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar || !avatar.url) {
    throw new ApiError(400, "Avatar file is required");
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

export { registerUser };