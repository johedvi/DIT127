import express, { Request, Response } from "express";

/* MergeParams allows router to find "forumId" */
export const postRouter = express.Router({mergeParams : true});
/* Dev notes: forumId = forum specific ID, 
                id = post specific ID
i.e /forum/<forumId>/post/<id> */

/* Get all posts from a specific forum */
postRouter.get("/",
    async (req : Request, res : Response) => {
        const forumExists = 
        // ...
        // Delete post
});