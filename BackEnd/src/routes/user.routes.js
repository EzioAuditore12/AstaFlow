import { Router } from "express";
import { registerUser,loginUser,logoutUser, getUserDetails, getUserProfile } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { videoUpload } from "../middlewares/videoUpload.middleware.js";
import { uploadVideo, streamVideo } from "../controllers/video.controller.js";

const router=Router()

router.route('/register').post(
    upload.fields([
        { 
            name:'avatar',
            maxCount:1
        },
        {
            name:'coverImage',
            maxCount:1
        }
    ]),
    registerUser
)

router.post(
    "/upload",
    verifyJWT,
    videoUpload.single('video'),
    uploadVideo
)

router.route('/user/:userId').get(verifyJWT, getUserDetails);
router.route('/profile').get(verifyJWT, getUserProfile);

router.route('/login').post(loginUser)
router.route('/logout').post(verifyJWT,logoutUser)
router.get("/stream/:videoId/:quality", streamVideo)
export default router