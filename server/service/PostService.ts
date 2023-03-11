import { IPost, Post } from "../model/Post";
import { IComment, Comment } from "../model/Comment";
import { postModel } from "../db/post.db";
import { commentModel } from "../db/comment.db";
import { accountModel } from "../db/account.db";
import { IAccount } from "../model/Account";

export interface IPostService {

    // Returns a list with specified ID, undefined otherwise
    getPost(id : number) : Promise<IPost | undefined>

    // Returns a list of comments inside a forum post.
    getComments() : Promise<Array<IComment>>;

    // Returns true if a comment is made successfully on a post.
    // Returns false otherwise.
    // Comment objects can't be deleted, only their content/body.
    submitComment(post : number, author : IAccount, content : string) : Promise<IPost | false>;

    // Upvotes the comment on index n inside the post and returns true.
    // Returns false if no comment with index n.
    voteComment(cid : number, ratee : string, type : boolean) : Promise<Boolean>;

    deleteComment(cid : number, user : IAccount) : Promise<Boolean>;
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
            transform : c => c = {id : c.id, author : c.author, content : c.content, rating : c.rating()}
            
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
     * @param {IAccount} author The author of the comment being created
     * @param {string} commentData IComment containing the username<String> and content<String>
     * @returns {Promise.<IPost | false>} Updated IPost object if successful. False otherwise.
     */
    async submitComment(postId : number, author : IAccount, content : string): Promise<IPost | false> {
        const getAuthor = await accountModel.findOne({username : author.username});
        /* Checks if the user exists */
        if(getAuthor === null){
            return false;
        }
        const comment = new Comment(getAuthor,content);
        const createComment = await commentModel.create(comment);
        const updateQuery = {$push: {comments : createComment}};
        const addCommentToPost = await postModel.findOneAndUpdate({id : postId},updateQuery,{new:true}).populate([{
            path : 'author',
            transform : a=> a = a.username
        },{
            path : 'comments',
            populate : {
                path : 'author',
                transform : a => a = a.username
            },
            transform : c => c = {id : c.id, author : c.author, content : c.content, rating : c.rating()}
        }]);
        // Check if post Update failed
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
     * @param {string} ratee The username of who is voting
     * @param {boolean} updown True is for Upvote, False is for Downvote
     * @returns True if voting succeeds, False otherwise
     */
    async voteComment(commentId : number, ratee : string, updown : boolean): Promise<Boolean> {
        const getUserId = await accountModel.findOne({username : ratee});
        if(getUserId===null){return false;} // User not found
        const queryBy = (updown) ? {upvoters : getUserId._id} : {downvoters : getUserId._id};
        const antiQueryBy = (updown) ? {downvoters : getUserId._id} : {upvoters : getUserId._id};
        const updateQuery = {
            $addToSet : queryBy,
            $pull : antiQueryBy
        };
        const response = await commentModel.findOneAndUpdate({id : commentId},updateQuery)
        if(response===null){return false;}
        return true;
    }

     /**
     * Clears the 'Author' and Content field of a comment if done by an authorized user (author or admin)
     * @async
     * @param {number} commentId The comment's ID of which to remove comment author and content from
     * @returns True if successful, False otherwise.
     */
    async deleteComment(commentId : number, user : IAccount): Promise<Boolean> {
        const getDeletedId = await accountModel.findOneAndUpdate({username : '<deleted>'},{},{upsert: true, new : true});
        if(getDeletedId===null){return false;} // Internal server error
        const update = {author : getDeletedId._id, content: "This comment has been removed."}
        const response = await commentModel.findOneAndUpdate({id : commentId, author : user},update,{new : true})
        if(response===null){return false;}
        return true;
    }
}

export function makePostService() : IPostService{
    return new PostDBService();
}