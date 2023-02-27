import express, { Request, Response } from "express";
import { Post } from "../model/Post";

/* MergeParams allows router to find "forumId" */
export const postRouter = express.Router({mergeParams : true});
/* Dev notes: forumId = forum specific ID, 
                id = post specific ID
i.e /forum/<forumId>/post/<id> */


/* Retrieve all posts inside subforum */
postRouter.get('/',async(
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
postRouter.put('/',async(
    req : Request<{id : string},{},{title : string, content : string, author : string}>,
    res : Response<Forum | String>
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
        if(postSuccess===false){
            res.status(500).send(`Unable to submit post to ${req.params.id}`);
            return;
        }
        res.status(201).send(postSuccess);
    }catch(e:any){res.status(500).send(e.message);}
});

/* Retrieve a post in a specific subforum */
postRouter.get("/:pid",async(
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

/* Comment on a specific post */
postRouter.put("/:pid/comment", async(
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