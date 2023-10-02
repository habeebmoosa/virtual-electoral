import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

import { electionRouter } from './routes/election.js';
import { userRouter } from './routes/user.js';
import { candidateRouter } from './routes/candidate.js';
import { voteRouter } from './routes/vote.js';
import { authRouter } from './routes/auth.js';

const app = express();

//middlewares
app.use(express.json());
app.use(cors());
dotenv.config();

app.use("/api/auth", authRouter);
app.use("/api/election", electionRouter);
app.use("/api/user", userRouter);
app.use("/api/candidate", candidateRouter);
app.use("/api/voting" , voteRouter);

//database connection
app.listen(process.env.PORT, async () => {
    console.log("App started");
    try {
        await mongoose.connect(process.env.MONGO_CONNECT_URI);
        console.log("Database is connected");
    } catch (error) {
        console.log(error)
    }
})

app.use((err , req , res , next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    return res.status(statusCode).json({
        success: false,
        message,
        statusCode,
    });
});