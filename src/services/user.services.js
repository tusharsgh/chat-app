import createHttpError from "http-errors";
import {UserModel} from "../models/index.js";
export const findUser=async(userID)=>{
const user = await UserModel.findById(userID);
if(!user) createHttpError.BadRequest('Please Fill all Fields');
return user;
}