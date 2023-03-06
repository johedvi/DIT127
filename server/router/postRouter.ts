import express, { Request, Response } from "express";
import { Post, IPost } from "../model/Post";
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
        /* Check logged in */
        if(req.session.user===undefined){
            res.status(401).send(`Bad PUT request to /post --- User most be signed in`);
            return;
        }
        /* Check if user exists */
        const getUserId = await accountModel.findOne({username : req.session.user.username});
        if(getUserId===null){
            res.status(500).send(`Bad PUT request to /post --- User does not exist`);
            return;
        }
        /* Create post and add to list of posts to specified forum */
        const postId = Date.now().valueOf();
        const newPost = {id : postId, title : req.body.title, content : req.body.content, author : getUserId, comments : []};
        const getPost = await postModel.create(newPost);
        const postObjectId = getPost._id;
        const updateForumObject = await forumModel.findOneAndUpdate({title : req.body.fid},{ $push: {posts : postObjectId}},{new : true});
        if(updateForumObject===null){
            res.status(500).send(`Error at updating forum posts`);
            return;
        }
        /* Forum successfully updated, return new forum object */
        res.status(201).send(updateForumObject);
    }catch(e:any){res.status(500).send(e.message);}
});

/* Retrieve a post in a specific subforum */
postRouter.get("/:pid",async(
    req : Request<{forumId : string, pid : number},{},{}>,
    res : Response<IPost |String>
)=>{
    try{
        const getPost = await postService.getPost(req.params.pid);
        if(getPost==null){
            res.status(404).send(`Bad GET call to ${req.originalUrl} --- Post does not exist.`);
            return;
        }
        res.status(200).send(getPost);
    }catch(e : any){
        res.status(500).send(`Unable to retrieve post ${req.params.pid} from forum ${req.params.forumId} with error ${e.message}`);
    }
});

/* Comment on a specific post */
postRouter.put("/:pid/comment", async(
    req : Request<{forumId : string, pid : number},{},{content : string}> & {
        session : {
            user? : Account
        }
    },
    res : Response<IPost|String>
)=>{
    try{
        /* Check if user is authorized */
        if(req.session.user===undefined){
            res.status(401).send(`Bad PUT to ${req.originalUrl} --- Unauthorized, user must be logged in`);
            return;
        }
        /* Create comment and add it to list of comments to this post */
        const comment = {id : -1, author : req.session.user.username , content : req.body.content, rating : -1};
        const response = await postService.submitComment(req.params.pid,comment);
        /* If False, user does not exist OR failure to create comment / push to comments[] */
        if(response===false){
            res.status(500).send(`Bad PUT to ${req.originalUrl} --- Authorization- or comment issue`);
            return;
        }
        res.status(201).send(response);
    } catch(e:any){
        res.status(500).send(`Server error ${e.message}`);
    }
})

/* Upvotes / downvotes a comment on a post */
postRouter.post("/:pid/comment", async(
    req : Request<{forumId : string, pid : number},{},{comment : number, vote : boolean}> & {
        session : {
            user? : Account
        }
    },
    res : Response<Boolean|String>
    )=>{
        const comment = req.body.comment;
        const vote = req.body.vote;
        /* Type checking requests input */
        if(typeof(comment)!=='number'||typeof(vote)!=='boolean'){
            res.status(400).send(`Expected comment id of type number, vote of type boolean, got ${typeof(comment)} and ${typeof(vote)}`);
            return;
        }
        /* Check if user is signed in / has a session */
        if(req.session.user===undefined){
            res.status(401).send(`User must be logged in to vote`);
            return;
        }
        const result = postService.voteComment(comment,req.session.user.username,vote);
        if(!result){
            res.status(500).send(`Comment voting error`);
            return;
        }
        res.status(200).send(`Voting successful`);
    }
)