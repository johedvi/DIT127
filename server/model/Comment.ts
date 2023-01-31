export class Comment {
    author  : string; //User?
    content : string;
    rating  : number;

    constructor(author : string, content : string){
        this.author  = author;
        this.content = content;
        this.rating  = 0;
    }

    upvote(){
        this.rating++;
    }
    downvote(){
        this.rating--;
    }
}