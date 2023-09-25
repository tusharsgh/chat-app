import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import ExpressMongoSanitize from 'express-mongo-sanitize';
import cookieParser from 'cookie-parser';
import compression  from 'compression';
import fileUpload from 'express-fileupload';
import cors from 'cors';
morgan.token('host', function(req, res) {
    return req.hostname;
    });
//dotEnv config
dotenv.config();
const app = express();
app.use(morgan(':method :host :status :res[content-length] - :response-time ms'));
app.use(helmet());
//parse json body
app.use(express.json());
app.use(express.urlencoded({ extended:true})); //encodes the data into the respnse url
//sanitize req data
app.use(ExpressMongoSanitize());
//enable cookie parser
app.use(cookieParser());
//compression
app.use(compression());
app.use(fileUpload({useTempFile:true}));

app.use(cors());
app.get('/', (req, res) => {
    res.send(req.body)
})

export default app;
