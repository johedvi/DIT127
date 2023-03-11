import express from "express";
import { forumRouter } from "./router/forumRouter";
import { postRouter } from "./router/postRouter";
import { loginRouter } from "./router/loginRouter";
import { settingsRouter } from "./router/settingsRouter";
import { userRouter } from "./router/userRouter";
import session from "express-session";
import cors from "cors";
export const app = express();

/* Allows the use of JSON in response/request */
app.use(session({
    secret : "tempsecretkey", // Replace with .env file
    resave : true,
    cookie : {
        maxAge : 1000*60*60*24, // Session lives for 24 hours
        secure : false          // Allows for super-test to bypass session (only use during development)
    },
    saveUninitialized : true
}));
app.use(cors({
    origin : true,
    credentials : true
}));
app.use(express.json());
app.use("/forum",forumRouter); // Handle all /forum requests
app.use("/forum/:forumId/post", postRouter); // Handle post / comment requests
app.use("/login",loginRouter);
app.use("/settings",settingsRouter);
app.use("/profile",userRouter);
app.listen(8080);