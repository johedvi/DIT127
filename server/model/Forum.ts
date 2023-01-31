import { Post } from "./Post"; 

export class Forum {
    title       : string;
    description : string;
    owner       : string;
    /* An array of members for this subforum should be here*/
    posts       : Array<Post>;

    constructor(title : string, description : string, owner : string){
        this.title       = title;
        this.description = description;
        this.owner       = owner;
        this.posts       = [];
    }
    /* Retrieve the lists of posts in this subforum */
    getPosts(){
        return this.posts;
    }

    /* Add / publish a post to this subforum */
    addPost(post : Post){
        this.posts.push(post);
    }
}