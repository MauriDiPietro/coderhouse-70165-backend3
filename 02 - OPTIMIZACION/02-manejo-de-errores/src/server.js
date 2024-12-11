import express from 'express';
import { errorHandler } from './middlewares/errorHandler.js';
import { CustomError, NotFoundError } from './error.manager.js';

const app = express();

app.use(express.json());

app.get('/', (req, res, next)=>{
    const admin = false
    const data = null
    try {
        // if(!data) throw new NotFoundError('Not Found')
        if(!data) throw new CustomError('Not found', 404, 'Not Found Error')
        if(!admin) throw new Error('Error get by id products')
        return res.send(admin)
    } catch (error) {
        // throw error
        next(error)
    }
})

app.use(errorHandler);

app.listen(8080, ()=>{
console.log('🚀 Server listening on port 8080');
});