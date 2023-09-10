import express from  'express'
import cors from 'cors'
import bodyparser from 'body-parser';
import adminRoute from './routes/adminRoute.js'
import fileUpload from 'express-fileupload';

import { errorHandler, notFound } from './middleware/errorMiddleware.js';

import dotenv from 'dotenv'

dotenv.config({path:'config/config.env'});

const app = express();

app.use(fileUpload({limits: { fileSize: 1 * 1024 * 1024 }}));
// built-in middleware for json 
app.use(express.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.urlencoded({ extended: false }));

app.use(cors())


// user defined middleware
app.use('/api/v1/',adminRoute);

// app.use(errorHandler)
app.use(notFound);

export default app;