import { Forum } from "../model/Forum";

export interface IForumService{
    /* Get all available subforums */
    getForums() : Promise<Array<Forum>>;

    findForum(input : string) : Promise<Forum | undefined>

    /* Create a subforum */
    createForum(t : string, d : string, o : string) : Promise<Forum>;
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
}

export function makeForumService() : IForumService{
    return new ForumService();
}