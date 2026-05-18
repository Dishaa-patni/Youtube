import { asynchandler } from "../utils/asyncHandler.js"
import {User} from "../models/user.models.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"


const registerUser = asynchandler(async (req , res)=>{
    // step 1 -> getting user info from frontend 

    const {fullname , email , password , username} = req.body;
    console.log(email , "email")

    // Validation of fields 

    // if(condition){
     // usually we write like this 
    // }

    //another way 
    if([fullname , email , password , username].some((field)=> field?.trim() === "")){
        throw new ApiError(400 , "All fields are required")
    }

     // to check if user already exist 
     const existedUser = await User.findOne(
        {
            $or: [
                {username},
                {email}
            ]
        }
    )

    if(existedUser){
        throw new ApiError(409 ,"User with email or username already exists")
    }

    //check for images we get req.body all the data but not related to files to get that multer has req.files 

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

    console.log(avatarLocalPath, "avartar")

    if(!avatarLocalPath){
      throw new  ApiError(400 , "Avatar File is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)

    console.log(avatar , "afu")
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar){
        throw new  ApiError(400 , "Avatar File is required")
    }

    //create an object 
    const user = await User.create({
        username: username.toLowerCase(),
        fullname,
        email,
        avatar : avatar.url,
        coverImage : coverImage?.url || "",
        password
    })

    // to check if user is created 
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500 , "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200 , createdUser , "User registered successfully")
    )
})

export {registerUser}
