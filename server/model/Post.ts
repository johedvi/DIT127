import { Comment } from "./Comment";

export class Post{
    title    : string;
    content  : string;
    author   : string;
    comments : Array<Comment>;

    constructor(title : string, content : string,author : string){
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

    deleteComment(index : number){
        if(index>this.comments.length){
            return false;
        }
        this.comments[index].content="This comment has been deleted.";
        this.comments[index].author="Removed.";
        return true;
    }
}