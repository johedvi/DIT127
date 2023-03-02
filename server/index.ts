import express from "express";
import { forumRouter } from "./router/ForumRouter";
import { postRouter } from "./router/postRouter";
import { userRouter } from "./router/userRouter";
import session from "express-session";
import cors from "cors";
export const app = express();

/* Allows the use of JSON in response/request */
app.use(session({
    secret : "tempsecretkey", // Replace with .env file
    resave : true,
    cookie : {maxAge : 1000*60*60*24}, // 24 hour sign-in time
    saveUninitialized : true
}));
app.use(cors({
    origin : true,
    credentials : true
}));
app.use(express.json());
app.use("/forum",forumRouter); // Handle all /forum requests
app.use("/login",userRouter);
app.use("/forum/:forumId/post", postRouter); // Handle post / comment requests
app.listen(8080);