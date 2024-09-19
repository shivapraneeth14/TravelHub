import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import connect from './src/Db/index.js';
import router from './src/Routes/User.Routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(cookieParser());
app.use(express.static('Public'));


app.use("/api", router)



connect()
.then(()=>{
    app.listen(PORT  ,()=>{
      console.log(`server is running ${PORT}`)
      console.log('Routes are: /api/register, /api/login');
    })
  })
  .catch((err)=>{
    console.log("mogngo connection eroor",err);
  })

 