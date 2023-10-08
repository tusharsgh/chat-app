import createHttpError from 'http-errors';
import {createUser,signUser} from '../services/auth.services.js';
import  {generateToken,verfiyToken}  from '../services/token.services.js';
import { findUser } from '../services/user.services.js';
export const register= async(req,res,next)=>
{
try{
   const{name,email,picture,status,password} = req.body;

   const  newUser = await createUser({name,email,picture,status,password})
   const access_Token = await generateToken(
      {userId: newUser._id},"1d",process.env.ACCESS_TOKEN_SECRET);
      const refresh_Token = await generateToken(
         {userId: newUser._id},"30d",process.env.REFRESH_TOKEN_SECRET);
         res.cookie('refreshToken',refresh_Token,{
            httponly:true,
            path:'/api/v1/auth/refreshToken',
            maxAge:30*24*60*1000,
         });
         console.table({access_Token,refresh_Token});
   res.json({
      message:"register successful",

     access_Token,
     user:{
      _id:newUser._id,
      name:newUser.name,
      email:newUser.email,
      picture:newUser.picture,
      status:newUser.status,
     }
   });
}catch(err){
   next(err);
}
};
export const login= async(req,res,next)=>
{
try{
const {email,password} = req.body;
const user=  await signUser(email,password)
res.json(user);
}catch(err){
   next(err);
}
};
export const logout= async(req,res,next)=>
{

try{
res.clearCookie('refresToken',{path:'/api/v1/auth/refreshToken'});
res.json({
   message:"logout successful",
})
}catch(err){
   next(err);     //msg sent to app.js error handling function
}
};
export const refershToken= async(req,res,next)=>
{
   const refresh_token=req.cookies.refreshToken;
   if(!refresh_token) throw createHttpError.Unauthorized("please Login");
   const check= await verfiyToken(refresh_token,process.env.REFRESH_TOKEN_SECRET);
   const user= await findUser(check.userId)
   const access_Token = await generateToken(
      {userId: user.userId},"1d",process.env.ACCESS_TOKEN_SECRET);
  
   res.json({
     user:{
      _id: user._id,
      name: user.name,
      email: user.email,
      picture: user.picture,
      status: user.status,
      token: access_Token,
     }
   });
try{

}catch(err){
   next(err);     //msg sent to app.js error handling function
}
};