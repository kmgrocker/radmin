
import app from './app.js';
import dotenv from 'dotenv';
import connectDb from './config/db.js'

// setting local env

dotenv.config({path:'backend/config/config.env'});

//setting up connection
connectDb();


const PORT = process.env.PORT || 5000

const server = app.listen(PORT, () => {
  
  console.log(
    `server is running on PORT ${PORT} in ${process.env.NODE_ENV} Mode`
  );
});

