import { IPost, Post } from "../model/Post";
import { IComment } from "../model/Comment";
import { postModel } from "../db/post.db";
import { commentModel } from "../db/comment.db";
import { accountModel } from "../db/account.db";

export interface IPostService {

    // Returns a list with specified ID, undefined otherwise
    getPost(id : number) : Promise<IPost | undefined>

    // Returns a list of comments inside a forum post.
    getComments() : Promise<Array<IComment>>;

    // Returns true if a comment is made successfully on a post.
    // Returns false otherwise.
    // Comment objects can't be deleted, only their content/body.
    submitComment(post : number, comment : IComment) : Promise<IPost | false>;

    // Upvotes the comment on index n inside the post and returns true.
    // Returns false if no comment with index n.
    voteComment(cid : number, ratee : string, type : boolean) : Promise<Boolean>;
}

/** @class */
class PostDBService implements IPostService{
    /**
     * Finds a post, populates and omits sensitive information. 
     * Returns post's ID, Title, Content, Author, and list of Comments. Undefined if not found.
     * @async
     * @param {number} id The unqiue ID of the post to retrieve
     * @returns The populated IPost object if found, undefined otherwise
     */
    async getPost(id : number) : Promise<IPost | undefined>{
        const response = await postModel.findOne({id : id}).populate([{
            path : 'author',
            transform : a => a = a.username
        },{
            path : 'comments',
            populate : {
                path : 'author',
                transform : a => a = a.username
            },
            transform : c => c = {id : c.id, author : c.author, content : c.content, rating : c.rating}
            
        }]);
        if(response===null){return undefined};
        return response;
    }

    /**
     * Returns all comments on a post
     * @async
     * @returns {Promise<Array.<IComment>>} Returns fetched comments
     */
    async getComments(): Promise<IComment[]> {
        return await postModel.find();
    }

    /**
     * Submits a comment to the specified post (postId) with content (commentData) by creating the comment document
     * and adding it to the list of comments for the post. Returns the updated post object of succesful, false otherwise.
     * @param {number} postId ID of the post the comment is submitted on
     * @param {IComment} commentData IComment containing the username<String> and content<String>
     * @returns {Promise.<IPost | false>} Updated IPost object if successful. False otherwise.
     */
    async submitComment(postId : number, commentData : IComment): Promise<IPost | false> {
        console.log("Entered submit");
        const getAuthorId = await accountModel.findOne({username : commentData.author},'_id');
        /* Checks if the user exists */
        if(getAuthorId === null){
            return false;
        }
        /* Create comment and add to post's list of comments, returning the populated fields
            without sensitive information. */
        const getDate = Date.now().valueOf();
        const commentJSON = {
            id : getDate, 
            author : getAuthorId, 
            content : commentData.content, 
            rating : 1,
            upvoters : [getAuthorId],
            downvoters : []
        };
        console.log("Attempt create");
        const createComment = await commentModel.create(commentJSON);
        console.log("Created comment");
        const updateQuery = {$push: {comments : createComment._id}};
        const addCommentToPost = await postModel.findOneAndUpdate({id : postId},updateQuery,{new:true}).populate([{
            path : 'author',
            transform : a=> a = a.username
        },{
            path : 'comments',
            populate : {
                path : 'author',
                transform : a => a = a.username
            },
            transform : c => c = {id : c.id, author : c.author, content : c.content, rating : c.rating}
        }]);
        console.log("Comment added to post");
        /* Check if post Update failed */
        if(addCommentToPost===null){
            return false;
        }
        return addCommentToPost;
    }

    /**
     * Upvotes or Downvotes a comment. One user can only upvote once or downvote once. If the user previously
     * upvoted and upvotes again then their vote is removed. If they previously upvoted and then downvotes then
     * it converts to a downvote (total difference of 2). Same applies if the user previously downvoted.
     * @param {number} commentId The ID of the comment the user is voting on
     * @param {string} ratee The user who is voting
     * @param {boolean} updown True is for Upvote, False is for Downvote
     * @returns True if voting succeeds, False otherwise
     */
    async voteComment(commentId : number, ratee : string, updown : boolean): Promise<Boolean> {
        const incrementBy = (updown) ? 1 : -1;
        const getUserId = await accountModel.findOne({username : ratee});
        if(getUserId===null){return false;} // User not found
        const queryBy = (updown) ? {upvoters : getUserId} : {downvoters : getUserId};
        const updateQuery = {
            $addToSet : queryBy
        };
        const response = await commentModel.findOneAndUpdate({id : commentId},updateQuery,[],function(err,res){
            if(err){
                return;
            }
        })
        if(response===null){return false;}
        return true;
    }
}

export function makePostService() : IPostService{
    return new PostDBService();
}