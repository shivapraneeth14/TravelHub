
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import connect from './src/Db/index.js';
import router from './src/Routes/User.Routes.js';
import path from 'path';
import { fileURLToPath } from 'url';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'Public/uploads')));
app.use('/models', express.static(path.join(__dirname, 'Public/models')));
app.use(cookieParser());
app.use(express.static('Public')); 

app.use("/api", router);

connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
      console.log('Routes are: /api/register, /api/login');
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
