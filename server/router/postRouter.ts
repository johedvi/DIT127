import express, { Request, Response } from "express";
import { IPostService } from "../service/postService";

export const postRouter = express.Router();

postRouter.get("/",
    async (req : Request, res : Response) => {
        const forum = req.params.id;
        res.status(200).send(forum);
});

postRouter.delete("/post:id",
    async (req : Request, res : Response) => {
        // ...
        // Delete post
});