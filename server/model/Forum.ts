import { Post } from "./Post"; 

export class Forum {
    title       : string;
    description : string;
    author      : string;
    /* An array of members for this subforum should be here*/
    posts       : Array<Post>;

    constructor(title : string, description : string, author : string){
        this.title       = title;
        this.description = description;
        this.author       = author;
        this.posts       = [];
    }
    /* Retrieve the lists of posts in this subforum */
    getPosts(){
        return this.posts;
    }

    /* Add / publish a post to this subforum */
    addPost(post : Post){
        const oldLength = this.posts.length;
        const newLength = this.posts.push(post);
        if(oldLength>=newLength) return false;
        return true;
    }
}