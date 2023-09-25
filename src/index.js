import app from './app.js';
import dotenv from 'dotenv';
import logger from './configs/logger.config.js';
dotenv.config();
//env values
console.log(process.env.NODE_ENV)
const PORT = process.env.PORT||8000;
app.listen(PORT,()=>
{logger.info(`listening on port ${PORT}...`);
});