import { Comment } from "./Comment";
import { Account } from "./Account";

export class Post{
    id       : Number;
    title    : string; // Title of the post
    content  : string; // The body of the post - what the author has published
    author   : Account; // Author
    comments : Array<Comment>; // A list of comments made by users to this specific post

    constructor(title : string, content : string,author : Account, id : number){
        this.id       = id;
        this.title    = title;
        this.content  = content;
        this.author   = author;
        this.comments = [];
    }

    /* Adds a comment to a post */
    addComment(comment : Comment){
        const preLength = this.comments.length;
        const newLength = this.comments.push(comment);
        return newLength>preLength;
    }

    /* Deletes the CONTENT of a specific comment. The object still exists in the list of comments. */
    deleteComment(index : number){
        if(index>this.comments.length){
            return false;
        }
        this.comments[index].deleteComment();
        return true;
    }
}