import app from './app.js';
import dotenv from 'dotenv';
import logger from './configs/logger.config.js';
import { log } from 'webpack/lib/node/nodeConsole.js';
import mongoose from 'mongoose';
//env values
dotenv.config();
const {DATABASE_URL} =process.env;
mongoose.connection.on('error', (err)=>{logger.error(err)
process.exit(1);
})


mongoose.connect(DATABASE_URL,{
    useNewUrlParser: true,
}).then(()=>{
    logger.info("connected to mongoose");
})


console.log(process.env.NODE_ENV)
const PORT = process.env.PORT||8000;
let server = app.listen(PORT,()=>
{logger.info(`listening on port ${PORT}...`);
  console.log("process id",process.pid)
//  throw new Error('error in server')
});
const exithandler =()=>{          
    if(server){                          //if server is on handles handles
        logger.info("server closed");
        process.exit(1);                //server is already closed
    }else{ 
        process.exit(1);}
}
const caughtException=(error)=>{      //handles server error
    logger.error(error);
    exithandler();
}
process.on('uncaughtException',caughtException);
process.on('unhandledException',caughtException);
