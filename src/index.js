import app from './app.js';


//env values
const PORT = process.env.PORT||8000;
app.listen(PORT,()=>
{console.log(`listening on port ${PORT}`);
});