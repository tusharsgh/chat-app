export const register= async(req,res,next)=>
{
try{
    res.send(req.body);
}catch(err){
   next(err);
}
};
export const login= async(req,res,next)=>
{
try{

}catch(err){
   next(err);
}
};
export const logout= async(req,res,next)=>
{
try{
res.send(req.body);
}catch(err){
   next(err);     //msg sent to app.js error handling function
}
};
export const refershToken= async(req,res,next)=>
{
try{

}catch(err){
   next(err);     //msg sent to app.js error handling function
}
};