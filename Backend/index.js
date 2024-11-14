import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connect from './src/Db/index.js';
import router from './src/Routes/User.Routes.js';
import path from 'path';
import { fileURLToPath } from 'url';
import serverless from 'serverless-http';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware Setup
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());

// Serve static assets via Vercel public folder instead of Express (Vercel automatically serves static files from `public`)
console.log("Starting serverless function...");

app.get("/health", (req, res) => {
  res.status(200).send("Server is healthy!");
});

// Database connection check
const initializeDbConnection = async () => {
  try {
    await connect();
    console.log("MongoDB connection established.");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};

// Ensure DB connection for each request in serverless (Vercel)
app.use(async (req, res, next) => {
  if (!global.dbConnection) {
    await initializeDbConnection();
    global.dbConnection = true;
  }
  next();
});

// Main Routes
app.use("/api", router);

export default serverless(app);
