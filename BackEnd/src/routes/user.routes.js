import { Router } from "express";
import { registerUser,loginUser,logoutUser, getUserDetails, getUserProfile } from "../controllers/user.controller.js";
import { cloudinaryUpload } from "../middlewares/cloudinaryUpload.middleware.js";
import { videoUpload } from "../middlewares/videoUpload.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { uploadVideo, streamVideo } from "../controllers/video.controller.js";

const router=Router()

router.route('/register').post(
    cloudinaryUpload.fields([
        { name: 'avatar', maxCount: 1 },
        { name: 'coverImage', maxCount: 1 }
    ]),
    registerUser
)

router.post(
    "/upload",
    verifyJWT,
    videoUpload.fields([
        { name: 'video', maxCount: 1 },
        { name: 'thumbnail', maxCount: 1 },
        { name: 'posterImage', maxCount: 1 }
    ]),
    uploadVideo
)

router.route('/user/:userId').get(verifyJWT, getUserDetails);
router.route('/profile').get(verifyJWT, getUserProfile);

router.route('/login').post(loginUser)
router.route('/logout').post(verifyJWT,logoutUser)
router.get("/stream/:videoId/:quality", streamVideo)
export default router