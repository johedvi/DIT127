import { IAccount } from "./Account";

/**
 * An IPost object has a unique ID, a title, content (post body), an author and a list of comments.
 * @interface IComment IComment
 * @property {string | IAccount} author - User who published the comment
 * @property {string} content - The content
 * @property {number} rating - The rating (upvotes & downvotes) from other users
 */
export interface IComment {
    id      : Number;
    author  :   IAccount;
    content :   String;
    rating  :   Number;
}

/**
 * @implements {IComment}
 * @param {string | IAccount} author - User who published the comment
 * @param {string} content - The content
 * @property {number} rating - The rating (upvotes & downvotes) from other users
 */

export class Comment {
    id      : Number;
    author  : IAccount;
    content : string; // The message
    upvoters : IAccount[];
    downvoters : IAccount[];

    constructor(author : IAccount, content : string){
        this.id      = Date.now().valueOf();
        this.author  = author;
        this.content = content;
        this.upvoters = [author];
        this.downvoters = [];
    }
}