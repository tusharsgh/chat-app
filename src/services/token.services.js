import {sign,verify}from "../utils/token.utils.js";
export const generateToken= async(payload,expiresIN,secret) => {
let token = await sign(payload,expiresIN,secret);
return token;
}
export const verfiyToken= async(refresh_token,secret)=>{
    let check= await verify(refresh_token,secret);
    return check;
}