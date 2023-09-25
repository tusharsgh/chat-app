import app from './app.js';
import dotenv from 'dotenv';
import logger from './configs/logger.config.js';
import { log } from 'webpack/lib/node/nodeConsole.js';
dotenv.config();
//env values
console.log(process.env.NODE_ENV)
const PORT = process.env.PORT||8000;
let server = app.listen(PORT,()=>
{logger.info(`listening on port ${PORT}...`);
  console.log("process id",process.pid)
// throw new Error('error in server')
});
const exithandler =()=>{          
    if(server){
        logger.info("server closed");
        process.exit(1);
    }else{ 
        process.exit(1);}
}
const caughtException=(error)=>{
    logger.error(error);
    exithandler();
}
process.on('uncaughtException',caughtException);
process.on('unhandledException',caughtException);
