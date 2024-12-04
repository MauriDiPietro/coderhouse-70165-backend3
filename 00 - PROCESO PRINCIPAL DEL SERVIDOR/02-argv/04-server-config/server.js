import express from 'express';
import config from './config.js';
import { initMongoDB } from './database.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const PORT = config.PORT

initMongoDB().then(()=>console.log('db conectada')).catch((error)=>console.log(error))

app.listen(PORT, ()=>{
    console.log(`🚀 Server listening on port ${PORT} in ${config.ENV} mode`);
});

