import { Forum } from "../model/Forum";
import { Post } from "../model/Post";

export interface IForumService{
    /* Get all available subforums in an array */
    getForums() : Promise<Array<Forum>>;

    /* Checks if a forum exists. Returns the forum if true, undefined otherwise. */
    findForum(input : string) : Promise<Forum | undefined>

    /* Creates a subforum and returns it */
    createForum(t : string, d : string, o : string) : Promise<Forum>;

    /* Submits a post to a subforum. 
    Returns updated forum object if successful, boolean false otherwise */
    submitPost(f : string, p : Post) : Promise<Boolean | Forum>;
}

class ForumService implements IForumService{
    forums : Array<Forum> = [];

    async getForums(): Promise<Forum[]> {
        return this.forums;
    }

    async findForum(input : string) : Promise<Forum | undefined>{
        return this.forums.find((f) => f.title===input);
    }

    async createForum(t : string, d : string, o : string): Promise<Forum> {
        const forum = new Forum(t,d,o);
        this.forums.push(forum);
        return forum;
    }
    
    async submitPost(f: string, p: Post): Promise<Boolean | Forum> {
        const forumExists = this.forums.find((forum)=>forum.title==f);
        if(forumExists==null){
            return false;
        }
        const postSuccess = forumExists.addPost(p);
        if(!postSuccess){
            return false;
        }
        return forumExists;
    }
}

export function makeForumService() : IForumService{
    return new ForumService();
}