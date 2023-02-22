import express from "express";
import { forumRouter } from "./router/forumRouter";
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
app.listen(8080);
//app.use("/forum/:forumId/post", postRouter); // TODO : shared forumService between forum and post router required