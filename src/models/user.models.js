import mongoose , {Schema}from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema(
    {
        username:{
            type: String,
            required: true,
            trim: true,
            index: true,
            unique: true,
            lowercase: true
        },
        email:{
            type: String,
            required: true,
            trim: true,
            unique: true,
            lowercase: true
        },
        fullname:{
            type: String,
            required: true,
            index: true,
            trim: true
        },
        avatar: {
           type: String, // we will be using cloudinary url
           required: true
        },
        coverImage:{
            type: String 
        },
        password:{
            type: String,
            required: [true , "Password is required"]
        },
        refreshToken : {
            type: String
        },
        watchHistory : {
            type : Schema.Types.ObjectId,
            ref: "Video"
        }
    },
    {
timestamps: true
    }
)

//try not to use arrow function because it does not have access to this keyword
userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
  
    this.password = await bcrypt.hash(this.password, 10);
  });

//creating our own custom method 
userSchema.methods.isPasswordCorrect = async function(password){
return await bcrypt.compare(password , this.password)
}

userSchema.methods.generateAccessToken = function(){
    jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.email,
        fullname: this.fullname
    } , process.env.ACCESS_TOKEN_SECRET , {
        expiresIn : process.env.ACCESS_TOKEN_EXPIRY
    })
}

userSchema.methods.generateRefreshToken = function(){
    jwt.sign({
        _id: this._id,
    } , process.env.REFRESH_TOKEN_SECRET, {
        expiresIn : process.env.REFRESH_TOKEN_EXPIRY
    })
}


export const User = mongoose.model("User" , userSchema)