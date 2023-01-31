import express, { Request, Response } from "express";
const router = express.Router();

router.post("/login", (req : Request, res : Response) => {
        // ....
        // Return something
});

router.get("/login", (req : Request, res : Response) => {
        // ....
        // Return login view
});

module.exports = router;