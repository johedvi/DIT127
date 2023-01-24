import { Comment } from "./comment.interface";

export class Post{
    title : string;
    content : string;
    comments : Array<Comment>;

    constructor(title : string, content : string){
        this.title = title;
        this.content = content;
        this.comments = [];
    }
}