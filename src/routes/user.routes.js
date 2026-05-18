import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

//to pass and work with file upload we need to use multer middleware
router.route("/register").post(

    //.fields when you want multiple file accross different form fields 
    upload.fields([
        {name: "avatar" , maxCount: 1},
        {name: "coverImage" , maxCount: 1}
    ]),
    registerUser)



export default router;