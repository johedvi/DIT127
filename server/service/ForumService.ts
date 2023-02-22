import { Forum } from "../model/Forum";
import { Post } from "../model/Post";
import { forumModel } from "../db/forum.db"

export interface IForumService{
    /* Get all available subforums in an array */
    getForums() : Promise<Array<Forum>>;

    /* Checks if a forum exists. Returns the forum if true, undefined otherwise. */
    findForum(input : string) : Promise<Forum | undefined>

    /* Creates a subforum and returns it */
    createForum(t : string, d : string, a : string) : Promise<Forum>;

    /* Submits a post to a subforum. 
    Returns updated forum object if successful, boolean false otherwise */
    submitPost(f : string, p : Post) : Promise<false | Forum>;
}

class ForumDBService implements IForumService{
    async getForums(): Promise<Forum[]> {
        return await forumModel.find();
    }

    async findForum(input: string): Promise<Forum | undefined> {
        return await forumModel.find();
    }

    async createForum(t: string, d: string, a: string): Promise<Forum> {
        return await forumModel.create({
            title : t,
            description : d,
            author : a,
            posts : []
        })
    }

    async submitPost(f: string, p: Post): Promise<false | Forum> {
        return await forumModel.
    }
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
    
    /* string 'f' is the forum in question for the post to be submitted to. */
    async submitPost(forum: string, p: Post): Promise<false | Forum> {
        const forumExists = this.forums.find((f)=>f.title==forum);
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