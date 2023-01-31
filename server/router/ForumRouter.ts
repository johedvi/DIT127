import exp from "constants";
import express from "express";
import { Response, Request } from "express";
import { Forum } from "../model/Forum";
import { makeForumService } from "../service/ForumService";
const forumService = makeForumService();

/* Allows this file to be exported/used in index.ts */
export const forumRouter = express.Router();

forumRouter.use(express.json());
// const description = req.body.description; // Json/javascript info from GET request

/* Request to retrieve all subforums */
forumRouter.get('/', async(
    req: Request<{},{},{}>, /* Pattern match on empty body */
    res: Response<Array<Forum> | string>
) => {
    try { /* Send back all forums if possible */
        const forums = await forumService.getForums();
        res.status(200).send(forums);
    } catch(e : any){ /* Else server error */
        res.status(500).send(e.message);
    }
})

/* Request to create new forum */
forumRouter.put('/', async(
    req: Request<{},{},{title : string, description : string, owner : string}>,
    res: Response<Forum | string>
) => {
    try {
        const title = req.body.title;
        const description = req.body.description;
        const owner = req.body.owner;
        /* Check for bad input */
        if(typeof(title)!=="string"||
        typeof(description)!=="string"||
        typeof(owner)!=="string"){res.status(400).send("Bad input");return;}
        /* Else... */
        const newForum = await forumService.createForum(title,description,owner);
        res.status(201).send(newForum);
    } catch(e:any){
        res.status(500).send(e.message);
    }
})

/* Retrieve specific forum on /forum/ID */
forumRouter.get("/:id",async(
    req: Request<{ id: string }, {}, {}>,
    res: Response<string>
) => {
    try{
        if(req.params.id==null){
            res.status(400).send(`Bad GET call to ${req.originalUrl} --- missing id param`);
            return;
        }
        const forums = await forumService.getForums(); //Get all forums
        const forum = forums.find(element=>element.title==req.params.id) //Find the specific one
        if(forum==undefined){ // Forum doesn't exist
            res.status(500).send(`Forum ${req.params.id} not found`);
            return;
        }
        res.status(200).send(JSON.stringify(forum));
    }catch(e:any){
        res.status(500).send(e.message);
    }
});