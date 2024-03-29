import express from "express";
import cors from 'cors';
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import listingRouter from "./routes/listing.route.js";
import cookieParser from "cookie-parser";
import dbConnect from "./db/dbConnect.js";
dotenv.config();

dbConnect()

const app = express();

// Enable CORS for all routes
app.use(cors({
  origin: 'https://real-estate-drab-phi.vercel.app', // Replace with your Firebase Hosting domain
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTION',
  credentials: true,
}));

app.use(express.json());

app.use(cookieParser());

app.listen(3000, () => {
  console.log("My server is running where is port 3000");
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
