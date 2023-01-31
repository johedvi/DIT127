import express, { Request, Response } from "express";
const router = express.Router();

router.get("/homepage",
    async (req : Request, res : Response) => {
        res.status(200).sendFile("homepage.html", {root : '../client/public/'});
});

module.exports = router;