import { Post } from "../model/Post";
import { Comment } from "../model/Comment";
import { postModel } from "../db/post.db";

export interface IPostService {
    // Returns a list of comments inside a forum post.
    getComments() : Promise<Array<Comment>>;

    // Returns true if a comment is made successfully on a post.
    // Returns false otherwise.
    // Comment objects can't be deleted, only their content/body.
    submitComment(post : Post, comment : Comment) : Promise<Boolean>;

    // Upvotes the comment on index n inside the post and returns true.
    // Returns false if no comment with index n.
    //upvoteComment(n : number) : Promise<Boolean>;

    // Downvotes the comment on index n inside the post and returns true.
    // Returns false if no comment with index n.
    //downvoteComment(n : number) : Promise<Boolean>;
}

class PostDBService implements IPostService{

    /* Returns all comments on a post */
    async getComments(): Promise<Comment[]> {
        return await postModel.find();
    }

    /* Adds a comment to a post, returns true if added false otherwise */
    async submitComment(post : Post, comment: Comment): Promise<Boolean> {
        const query = {id : post.id};
        const result =  await postModel.updateOne(query,{$push: {comments : comment}});
        return result.acknowledged;
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