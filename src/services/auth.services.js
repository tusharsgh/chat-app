import createHttpError from 'http-errors';
import validator from 'validator';
import UserModel  from '../models/userModel.js';
import bcrypt from "bcrypt";

export const createUser= async(userData)=>{

    const{name,email,picture,status,password} = userData;
// check for empty fields
if(!name||!email||!password){
    throw createHttpError.BadRequest('Please fill all fields')
} 
if(!validator.isLength(name,{
min:2,
max:128,
})){
    throw createHttpError.BadRequest('Please make sure your name is between 2 and 128 characters');
}
if(!validator.isLength(email)){
    throw createHttpError.BadRequest('Please enter a valid email');
}
const checkDb= await UserModel.findOne({email});
if(checkDb){
    throw createHttpError.Conflict('Pleaser try with a different email')
}

if(!validator.isLength(password,{
    min:6,
    max:128
})){
    throw createHttpError.BadRequest('Please make sure your password is in between 6 and 128 characters');
}

//hash password



//adding user to database
const user= await new UserModel({
    name,
    email,
    picture,
    status,
    password,
}).save()
return user;
};
export const signUser = async(email,password) =>{
   const user= await  UserModel.findOne({email:email.toLowerCase()}).lean();
   
   //user doesn't exist
   if(!user) throw createHttpError.NotFound('Invalid credentials');
 
   //compare password
   let passwordMatches = await bcrypt.compare(password, user.password);
if(!passwordMatches) throw createHttpError.NotFound('Invalid credentials');

return user;

}
