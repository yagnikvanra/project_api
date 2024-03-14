import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authrouter from "./routes/userRoute.js";
import errorHandler from "./middleware/errorHandler.js";
import cookieParser from "cookie-parser";
import wetherrouter from "./routes/wetherRoute.js";
import color from "colors";


const app = express();
dotenv.config();

mongoose.set('strictQuery', false);
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });

app.use(express.json());
app.use(cookieParser());
app.use(errorHandler);

// all routes:
app.use('/api/auth', authrouter);
app.use('/api/wether', wetherrouter);


app.listen(process.env.APP_PORT, () => {
    console.log(`Server is running on port ${process.env.APP_PORT}`.bgMagenta);
});