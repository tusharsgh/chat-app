import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true,"Please Provide Your Name"],
    },
    email:{
        type: String,
        required: [true,"Please Provide Your Email"],
        unique: [true,"Thise email address already exist"],
        lowercase: true,
        validate:[validator.isEmail,"Please provide a email"]
    },
    picture:{
        type: String,

    },
   status:{
    type: String,
    default: "Tryst with destiny"
   },
   password:{
    type: String,
    required: [true,"Please Provide Your Password"],
    minLength:[6," length of the password should be greater than 6 characters"],
    maxLength:[128," length of the password should be less than 128 characters"],

   },
},
{
    collection:"users",
    timestamps:true
}
)
userSchema.pre('save', async function(next){
    try{
if(this.isNew){
 const salt= await bcrypt.genSalt(12);
 const hashedPassword= await bcrypt.hash(this.password,salt);
 this.password=hashedPassword;
}
next();
    }
    catch(error){
      next(error);
    }
})
const UserModel = mongoose.models.UserModel ||mongoose.model("UserModel",userSchema)

export default UserModel;