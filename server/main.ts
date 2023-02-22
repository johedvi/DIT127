import express, { Express, Request, Response } from "express";

const app : Express = express();

/*app.get("/*.html",
    async (req : Request, res : Response, next) => {
      req.url = req.url.replace(".html", "");
      res.redirect(req.url);
});*/

app.use(express.static("../client/public/"));
app.use(require("./router/indexRouter"));
app.use(require("./router/homepageRouter"));
app.use(require("./router/postRouter"));
app.use(require("./router/userRouter"));


app.get("/",
    async (req : Request, res : Response) => {
    res.redirect("index");
});

app.listen(8080);