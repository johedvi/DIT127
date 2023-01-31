import { Forum } from "../model/Forum";

export interface IForumService{
    /* Get all available subforums */
    getForums() : Promise<Array<Forum>>;

    /* Create a subforum */
    createForum(t : string, d : string, o : string) : Promise<Forum>;
}

class ForumService implements IForumService{
    forums : Array<Forum> = [];

    async getForums(): Promise<Forum[]> {
        return this.forums;
    }

    async createForum(t : string, d : string, o : string): Promise<Forum> {
        const forum = new Forum(t,d,o);
        this.forums.push(forum);
        return forum;
    }
}

export function makeForumService() : IForumService{
    return new ForumService();
}