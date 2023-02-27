import express from "express";
import { forumRouter } from "./router/forumRouter";
import { postRouter } from "./router/postRouter";
import { userRouter } from "./router/userRouter";
import session from "express-session";
import cors from "cors";
export const app = express();

/* Allows the use of JSON in response/request */
app.use(session({
    secret : "Replace with file", // Replace with .env file
    resave : false,
    saveUninitialized : true
}))
app.use(cors({
    origin : true,
    credentials : true
}));
app.use(express.json());
app.use("/forum",forumRouter); // Handle all /forum requests
app.use("/login",userRouter);
app.use("/forum/:forumId/post", postRouter); // Handle post / comment requests
app.listen(8080);