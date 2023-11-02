import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import ExpressMongoSanitize from 'express-mongo-sanitize';
import cookieParser from 'cookie-parser';
import compression  from 'compression';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import createHttpError from 'http-errors';
import routes from './routes/index.js';
morgan.token('host', function(req, res) {
    return req.hostname;
    });
//dotEnv config
dotenv.config();
const app = express();
app.use(cors());
if(process.env.NODE_ENV != 'production'){
app.use(morgan(':method :host :status :res[content-length] - :response-time ms'));} //logs http request
app.use(helmet());//parse json body
app.use(express.json());
// app.use(express.urlencoded({ extended:true})); //encodes the data into the respnse url
//sanitize req data
app.use(ExpressMongoSanitize());

//enable cookie parser
app.use(cookieParser());
//compression
app.use(compression());
app.use(fileUpload({useTempFile:true}));
app.use("/api/v1",routes);//called to the routes

// const corsOptions ={
//     origin:'http://localhost:3000', 
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200
// }
// const cors = require('cors');

app.get('/', (req, res) => {
     res.send(req.body)

})
app.use(async(req,res,next)=>{
  next(createHttpError.BadRequest('this route doesnt exist'))
})
//error handling
app.use(async(err,req,res,next)=>{
    res.status(err.status||500)
    res.send(
        {
            error:{
                status:err.status||500,
                message:err.message,
            }
        }
    )

})

export default app;
