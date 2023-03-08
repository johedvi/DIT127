import { Comment } from "./Comment";
import { Account } from "./Account";

export interface IPost {
    id      : Number;
    title   : String,
    content : String,
    author  : Account|String;
    comments: Comment[];
}

/**
 * An IPost object has a unique ID, a title, content (post body), an author and a list of comments.
 * @interface IPost IPost
 * @property {number} id - Internal id
 * @property {string} title - Title of the post
 * @property {string} content - The body of the post - what the author has published
 * @property {string | Account} author - The creator of the post. May be the account object itself or just the username
 * @property {Array.<Comment>} comments - List of comments in the post.
 */

/**
 * @implements {IPost}
 * @param {string} title - Title of the post
 * @param {string} content - The body of the post - what the author has published
 * @param {string | Account} author - The creator of the post. May be the account object itself or just the username
 * @param {number} id - Internal id
 * @property {Array.<Comment>} comments - List of comments in the post.
 */

export class Post implements IPost{
    id       : Number;
    title    : string; // Title of the post
    content  : string; // The body of the post - what the author has published
    author   : Account; // Author
    comments : Array<Comment>; // A list of comments made by users to this specific post

    constructor(id : number, title : string, content : string,author : Account){
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