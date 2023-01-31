import express, { Request, Response } from "express";

const router = express.Router();

router.post("/post:id",
    async (req : Request, res : Response) => {
        // Check if allowed to post ...
        // ... 
        // Create post
});

router.get("/post:id",
    async (req : Request, res : Response) => {
        // Get post view.
});

router.delete("/post:id",
    async (req : Request, res : Response) => {
        // ...
        // Delete post
});

module.exports = router;