import { Post } from "../model/post.interface";
import { Comment } from "../model/comment.interface";

export interface IPostService {
    // Returns the name of author
    getAuthor() : Promise<string>;

    // Returns the title of post
    getTitle() : Promise<string>;
    
    // Returns the content of the post
    getContent() : Promise<string>;

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
    post : Post = new Post("Author", "Title", "Content");
    comments : Array<Comment> = [];

    async getAuthor(): Promise<string> {
        return this.post.author
    }

    async getTitle(): Promise<string> {
        return this.post.author;
    }

    async getContent(): Promise<string> {
        return this.post.content;
    }

    async getComments(): Promise<Comment[]> {
        return this.comments;
    }

    async submitComment(comment : Comment) : Promise<Boolean> {
        this.comments.push(comment);
        return true;
    }

    async upvoteComment(n : number) : Promise<Boolean> {
        let c = this.comments[n];
        if (c) {
            c.upvote();
            return true;
        }
        return false;
    }

    async downvoteComment(n : number) : Promise<Boolean> {
        let c = this.comments[n];
        if (c) {
            c.downvote();
            return true;
        }
        return false;
    }
}