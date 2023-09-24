import app from './app.js';
import dotenv from 'dotenv';

//dotEnv config
dotenv.config();

//env values
const PORT = process.env.PORT||8000;
app.listen(PORT,()=>
{console.log(`listening on port ${PORT}`);
});