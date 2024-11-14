import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import connect from './src/Db/index.js';
import router from './src/Routes/User.Routes.js';
import path from 'path';
import { fileURLToPath } from 'url';
import serverless from 'serverless-http';

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware Setup
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'Public/uploads')));
app.use('/models', express.static(path.join(__dirname, 'Public/models')));
app.use(cookieParser());
app.use(express.static('Public'));

// Database Initialization
let dbInitialized = false;
const initializeDb = async () => {
  if (!dbInitialized) {
    try {
      await connect();
      dbInitialized = true;
      console.log("MongoDB connection established.");
    } catch (err) {
      console.error("MongoDB connection error:", err);
    }
  }
};

// Ensure DB is connected before each request
app.use(async (req, res, next) => {
  await initializeDb();
  next();
});

// Lightweight Health Check Route (Optional)
app.get("/health", (req, res) => {
  res.status(200).send("Server is healthy!");
});

// Routes Setup
app.use("/api", router);

// Export serverless handler
export default serverless(app);
