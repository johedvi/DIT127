import { Account } from "./Account";

/* Enumerator for upvote and downvotes */
enum voteType {
    UP,
    DOWN
}

/* A tuple type consisting of a unique users ID and corresponding upvote / downvote */
type Tuple = {
    username : string,
    vote : voteType
}

export interface IComment {
    id      : Number;
    author  :   String|Account;
    content :   String;
    rating  :   Number;
}

export class Comment implements IComment {
    id      : Number;
    author  : Account|string; // User who published the comment
    content : string; // The message
    rating  : number; // The rating (upvotes & downvotes) from other users
    ratees  : Tuple[]; // list of ID's from users who has upvoted / downvoted. No 1 user can upvote/downvote more than once.

    constructor(author : Account, content : string){
        this.id      = Date.now().valueOf();
        this.author  = author;
        this.content = content;
        this.rating  = 0;
        this.ratees  = [];
    }

    /* Upvotes the comment. If the ratee has already upvoted then undo the upvote.
        If the ratee previously downvoted then change it to an upvote (=+2 difference) */
    upvote(ratee : string){
        const getRateeIndex = this.ratees.findIndex((tuple)=>tuple.username==ratee);
        if(getRateeIndex === -1){ // User has not yet voted, add them to the list and increase rating
            const newRatee : Tuple = {username : ratee, vote : voteType.UP};
            this.ratees.push(newRatee);
            this.rating += 1;
            return true;
        }
        const getRatee = this.ratees[getRateeIndex];
        // Has already voted, check if upvote or downvote
        if(getRatee.vote===voteType.UP){ // Already upvoted, remove vote
            this.ratees.splice(getRateeIndex); // Removes the ratee
            this.rating -= 1;
            return true;
        }
        if(getRatee.vote===voteType.DOWN){ // Change downvote to upvote
            const updateRatee = {username : getRatee.username, vote : voteType.UP};
            this.ratees[getRateeIndex] = updateRatee;
            this.rating += 2;
            return true;
        }
        return false; // Fail safe
    }
    /* Downvotes the comment. If the ratee has already downvoted then undo the downvote. 
        If the ratee previously upvoted then change it to a downvote (=-2 difference) */
    downvote(ratee : string){
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