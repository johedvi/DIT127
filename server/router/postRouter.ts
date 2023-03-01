import express, { Request, Response } from "express";
import { Post } from "../model/Post";
import { Account } from "../model/Account";
import { Comment } from "../model/Comment";
import { Forum } from "../model/Forum";
import { postModel } from "../db/post.db";
import { forumModel } from "../db/forum.db";
import { accountModel } from "../db/account.db";
import { makePostService } from "../service/postService";
import { makeForumService } from "../service/forumService";
const postService = makePostService();
const forumService = makeForumService();


/* MergeParams allows router to find "forumId" */
export const postRouter = express.Router({mergeParams : true});
/* Dev notes: forumId = forum specific ID, 
                id = post specific ID
i.e /forum/<forumId>/post/<id> */


/* Retrieve all posts inside subforum */
postRouter.get('/',async(
    req : Request<{},{},{fid : string}>,
    res : Response<Post[] | string>
) => {
    try{
        /* Find if the given forum exists, if so retrieve its posts */
        const exist = await forumModel.findOne({title : req.body.fid});
        if(exist==null){
            res.status(404).send(`Forum ${req.body.fid} not found.`);
            return;
        }
        res.status(200).send(exist.posts);
    }catch(e:any){res.status(500).send(e.message);}
});

/* Creates a post in a specific subforum */
postRouter.put('/',async(
    req : Request<{},{},{fid : string, title : string, content : string}> &
    {
        session : {
            user? : Account
        }
    },
    res : Response<Forum | String>
) =>{
    try{
        /* Check if forum exists */ 
        const forumExists = await forumModel.findOne({title:req.body.fid});
        if(forumExists==null){
            res.status(404).send(`Forum ${req.body.fid} not found.`);
            return;
        }
        /* Check if user exists */
        if(req.session.user===undefined){
            res.status(403).send(`Bad PUT request to /post --- User most be signed in`);
            return;
        }
        /* Create post and add to forum */
        const getUserId = await accountModel.findOne({username : req.session.user.username});
        if(getUserId===null){
            return;
        }
        const postId = Date.now().valueOf();
        const newPost = {id : postId, title : req.body.title, content : req.body.content, author : getUserId, comments : []};
        const response = postModel.create(newPost,function(err,post){
            if(err) return false;
            return post._id;
        });
        if(response.getErr){
            res.status(500).send(`Unable to submit post to ${req.body.fid}`);
            return;
        }
        const getPost = await postModel.findOne({id : postId});
        if(getPost===null){
            return;
        }
        const postObjectId = getPost._id;
        const updateForumObject = await forumModel.findOneAndUpdate({title : req.body.fid},{ $push: {posts : postObjectId}},{new : true});
        if(updateForumObject===null){
            res.status(500).send(`Error at updating forum posts`);
            return;
        }
        res.status(201).send(updateForumObject);
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
    req : Request<{id : string, pid : string},{},{author : string, content : string}> & {
        session : {
            user? : Account
        }
    },
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
        if(req.session.user===undefined){
            return;
        }
        const comment = new Comment(req.session.user,req.body.content);
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