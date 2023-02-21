import express from "express";
import { Response, Request } from "express";
import { Forum } from "../model/Forum";
import { Post } from "../model/Post";
import { Comment } from "../model/Comment";
import { makeForumService } from "../service/forumService";
import { makeAccountService } from "../service/accountService";
const forumService = makeForumService();

/* Allows this file to be exported/used in index.ts */
export const forumRouter = express.Router();

forumRouter.use(express.json());

/* Request to retrieve all subforums */
forumRouter.get('/', async(
    req: Request,
    res: Response<Array<Forum> | string>
) => {
    try { /* Send back all forums if possible */
        const forums = await forumService.getForums();
        res.status(200).send(forums);
    } catch(e : any){ /* Else server error */
        res.status(500).send(e.message);
    }
});

/* Request to create new forum */
forumRouter.put('/', async(
    req: Request<{},{},{title : string, description : string, author : string}>,
    res: Response<Forum | string>
) => {
    try {
        const title = req.body.title;
        const description = req.body.description;
        const author = req.body.author;
        /* Check for bad input */
        if(typeof(title)!=="string"||
        typeof(description)!=="string"||
        typeof(author)!=="string"){res.status(400).send("Bad input");return;}
        /* Else... */
        const newForum = await forumService.createForum(title,description,author);
        res.status(201).send(newForum);
    } catch(e:any){
        res.status(500).send(e.message);
    }
});

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
            res.status(404).send(`Forum ${req.params.id} not found.`);
            return;
        }
        res.status(200).send(JSON.stringify(forum));
    }catch(e:any){
        res.status(500).send(e.message);
    }
});

/*  ***     ***
FORUM SPECIFIC POST HANDLING
    ***     *** */  

/* Retrieve all posts inside subforum */
forumRouter.get('/:id/post',async(
    req : Request<{id : string},{},{}>,
    res : Response<Post[] | string>
) => {
    try{
        /* Find if the given forum exists, if so retrieve its posts */
        const exist = await forumService.findForum(req.params.id);
        if(exist==null){
            res.status(404).send(`Forum ${req.params.id} not found.`);
            return;
        }
        res.status(200).send(exist.posts);
    }catch(e:any){res.status(500).send(e.message);}
});

/* Creates a post in a specific subforum */
forumRouter.put('/:id/post',async(
    req : Request<{id : string},{},{title : string, content : string, author : string}>,
    res : Response<string>
) =>{
    try{
        /* Check if forum exists */ 
        const forumExists = await forumService.findForum(req.params.id);
        if(forumExists==null){
            res.status(404).send(`Forum ${req.params.id} not found.`);
            return;
        }
        /* Check if user exists */

        /* Create post and add to forum */
        const newPost = new Post(req.body.title,req.body.content,req.body.author);
        const postSuccess = await forumService.submitPost(req.params.id,newPost);
        if(postSuccess==false){
            res.status(500).send(`Unable to submit post to ${req.params.id}`);
            return;
        }
        res.status(201).send(JSON.stringify(postSuccess));
    }catch(e:any){res.status(500).send(e.message);}
});

/* Retrieve a post in a specific subforum */
forumRouter.get("/:id/post/:pid",async(
    req : Request<{id : string, pid : string},{},{}>,
    res : Response<Post |String>
)=>{
    try{
        const forumExists = await forumService.findForum(req.params.id);
        if(forumExists==null){
            res.status(404).send(`Forum ${req.params.id} not found.`)
            return;
        }
        const post = forumExists.posts.find((p)=>p.title==req.params.pid);
        if(post==null){
            res.status(404).send(`Post ${req.params.pid} not found.`);
            return;
        }
        res.status(200).send(post);
    }catch(e : any){
        res.status(500).send(`Unable to retrieve post ${req.params.pid} from forum ${req.params.id} with error ${e.message}`);
    }
});

/* ** **
    COMMENTING ON A POST RELATED
    **  ** */
/* Comment on a specific post */
forumRouter.put("/:id/post/:pid/comment", async(
    req : Request<{id : string, pid : string},{},{author : string, content : string}>,
    res : Response<Comment|String>
)=>{
    try{
        const forumExists = await forumService.findForum(req.params.id);
        if(forumExists==null){
            res.status(404).send(`Forum ${req.params.id} not found.`)
            return;
        }
        const post = forumExists.posts.find((p)=>p.title==req.params.pid);
        if(post==null){
            res.status(404).send(`Post ${req.params.pid} not found.`);
            return;
        }
        const comment = new Comment(req.body.author,req.body.content);
        const commented = post.addComment(comment);
        if(commented==false){
            res.status(500).send(`Unable to post comment`);
            return;
        }
        res.status(201).send(comment);
    } catch(e:any){
        res.status(500).send(`Server error ${e.message}`);
    }
})
/*
COMMON RESPONSES
if(req.params.id==null){
            res.status(400).send(`Bad GET call to ${req.originalUrl} --- missing id param`);
            return;
        }
*/