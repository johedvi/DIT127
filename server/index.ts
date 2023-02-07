import express from "express";
import { forumRouter } from "./router/forumRouter";
import { postRouter } from "./router/postRouter";
export const app = express();

/* Allows the use of JSON in response/request */
app.use(express.json());
app.use("/forum",forumRouter); // Handle all /forum requests
app.listen(3000);