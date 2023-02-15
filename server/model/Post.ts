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
}