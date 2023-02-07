import { Post } from "../model/Post";
import { Comment } from "../model/Comment";

export interface IPostService {
    // Returns a list of comments inside a forum post.
    getComments() : Promise<Array<Comment>>;

    // Returns true if a comment is made successfully on a post.
    // Returns false otherwise.
    // Comment objects can't be deleted, only their content/body.
    submitComment(comment : Comment) : Promise<Boolean>;

    // Upvotes the comment on index n inside the post and returns true.
    // Returns false if no comment with index n.
    upvoteComment(n : number) : Promise<Boolean>;

    // Downvotes the comment on index n inside the post and returns true.
    // Returns false if no comment with index n.
    downvoteComment(n : number) : Promise<Boolean>;
}

export class PostService implements IPostService {
    comments : Array<Comment> = [];

    async getComments(): Promise<Comment[]> {
        return this.comments;
    }

    async submitComment(comment: Comment): Promise<Boolean> {
        const preLength = this.comments.length;
        const newLength = this.comments.push(comment);
        return newLength>preLength;
    }

    async upvoteComment(commentID: number): Promise<Boolean> {
        if(commentID>=this.comments.length){ // Out of bounds
            return false;
        }
        this.comments[commentID].upvote();
        return true;
    }

    async downvoteComment(commentID: number): Promise<Boolean> {
        if(commentID>=this.comments.length){
            return false;
        }
        this.comments[commentID].downvote();
        return true;
    }
}

export function makePostService() : IPostService{
    return new PostService();
}