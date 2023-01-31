import express from "express";
import { forumRouter } from "./router/ForumRouter";
const app = express();

/* Allows the use of JSON in response/request */
app.use(express.json());
app.use("/forum",forumRouter);
app.listen(3000);