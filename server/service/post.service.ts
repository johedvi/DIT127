import { Post } from "../model/post.interface";
import { Comment } from "../model/comment.interface";

export interface IPostService {
    // Returns a list of comments inside a forum post.
    getComments() : Promise<Array<Comment>>;

    // Returns true if a comment is made successfully on a post.
    // Returns false otherwise.
    submitComment(comment : Comment) : Promise<Boolean>;

    // Upvotes the comment on index n inside the post and returns true.
    // Returns false if no comment with index n.
    upvoteComment(n : number) : Promise<Boolean>;

    // Downvotes the comment on index n inside the post and returns true.
    // Returns false if no comment with index n.
    downvoteComment(n : number) : Promise<Boolean>;
}

class PostService implements IPostService {
    comments : Array<Comment> = [];

    async getComments(): Promise<Comment[]> {
        return this.comments;
    }
}