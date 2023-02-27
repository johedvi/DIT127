import { Account } from "./Account";

/* Enumerator for upvote and downvotes */
enum voteType {
    UP,
    DOWN
}

/* A tuple type consisting of a unique users ID and corresponding upvote / downvote */
type Tuple = {
    id : number,
    vote : voteType
}


export class Comment {
    // id   : string? some unique ID for a post that this comment is associated with
    author  : Account|string; // User who published the comment
    content : string; // The message
    rating  : number; // The rating (upvotes & downvotes) from other users
    ratees  : Tuple[]; // list of ID's from users who has upvoted / downvoted. No 1 user can upvote/downvote more than once.

    constructor(author : Account, content : string){
        this.author  = author;
        this.content = content;
        this.rating  = 0;
        this.ratees  = [];
    }

    /* Upvotes the comment. If the ratee has already upvoted then undo the upvote.
        If the ratee previously downvoted then change it to an upvote (=+2 difference) */
    upvote(ratee : number){

        this.rating++;
        return true;
    }
    /* Downvotes the comment. If the ratee has already downvoted then undo the downvote. 
        If the ratee previously upvoted then change it to a downvote (=-2 difference) */
    downvote(ratee : number){
        this.rating--;
        return true;
    }
    /* Irreversible event that removes the authors name and content of the comment.
        The comment will still exist as an object but its contents will be blanked out. */
    deleteComment(){
        this.author = "Deleted";
        this.content = "This comment has been deleted."
    }
}