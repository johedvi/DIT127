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
    //upvoteComment(n : number) : Promise<Boolean>;

    // Downvotes the comment on index n inside the post and returns true.
    // Returns false if no comment with index n.
    //downvoteComment(n : number) : Promise<Boolean>;
}

class PostDBService implements IPostService{
    /**
     * Finds a post, populates and omits sensitive information. 
     * Returns post's ID, Title, Content, Author, and list of Comments. Undefined if not found.
     * @param id The unqiue ID of the post to retrieve
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
            transform : c => c = {author : c.author, content : c.content, rating : c.rating}
            
        }]);
        if(response===null){return undefined};
        return response;
    }

    /* Returns all comments on a post */
    async getComments(): Promise<IComment[]> {
        return await postModel.find();
    }

    /**
     * Submits a comment to the specified post (postId) with content (commentData) by creating the comment document
     * and adding it to the list of comments for the post. Returns the updated post object of succesful, false otherwise.
     * @param postId ID of the post the comment is submitted on
     * @param commentData IComment containing the username<String> and content<String>
     * @returns Updated IPost object if successful. False otherwise.
     */
    async submitComment(postId : number, commentData : IComment): Promise<IPost | false> {
        const getAuthorId = await accountModel.findOne({username : commentData.author},'_id');
        /* Checks if the user exists */
        if(getAuthorId === null){
            return false;
        }
        /* Create comment and add to post's list of comments, returning the populated fields
            without sensitive information. */
        const commentJSON = {author : getAuthorId, content : commentData.content, rating : 1, ratees : [getAuthorId]};
        const createComment = await commentModel.create(commentJSON);
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
            transform : c => c = {author : c.author, content : c.content, rating : c.rating}
        }]);
        /* Check if post Update failed */
        if(addCommentToPost===null){
            return false;
        }
        return addCommentToPost;
    }

    /* Upvotes a comment, returns true if successful false otherwise*/
    /*async upvoteComment(n: number): Promise<Boolean> {
        
    }

    Downvotes a comment, returns true if successful false otherwise
    async downvoteComment(n: number): Promise<Boolean> {
        
    }*/
}

export function makePostService() : IPostService{
    return new PostDBService();
}