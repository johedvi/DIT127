import { Comment } from "./comment.interface";

export class Post{
    author : string; // Username or userID
    title : string;
    content : string;
    comments : Array<Comment>;

    constructor(author : string, title : string, content : string){
        this.author = author;
        this.title = title;
        this.content = content;
        this.comments = [];
    }
}