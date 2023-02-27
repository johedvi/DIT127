import { Forum } from "../model/Forum";
import { Post } from "../model/Post";
import { Account } from "../model/Account";
import { forumModel } from "../db/forum.db"

/* Populate() */

export interface IForumService{
    /* Get all available subforums in an array */
    getForums() : Promise<Array<Forum>>;

    /* Checks if a forum exists. Returns the forum if true, undefined otherwise. */
    findForum(input : string) : Promise<Forum | undefined>

    /* Creates a subforum and returns it, returns undefined if error occurs */
    createForum(t : string, d : string, a : Account) : Promise<Forum | undefined>;

    /* Submits a post to a subforum. 
    Returns updated forum object if successful, boolean false otherwise */
    submitPost(f : string, p : Post) : Promise<false | Forum>;
}

class ForumDBService implements IForumService{

    /* Retrieves all existing forums. */
    async getForums(): Promise<Forum[]> {
        return await forumModel.find();
    }

    /* Search for a specific forum. Returns the forum if found, undefined otherwise. */
    async findForum(input: string): Promise<Forum | undefined> {
        const result = await forumModel.findOne({title : input});
        if(result===null){return undefined}
        return result;
    }

    /* Creates a forum and returns the new forum if successful, undefined otherwise. */
    async createForum(title: string, description: string, author: Account): Promise<Forum | undefined> {
        const newForum = new Forum(title,description,author);
        return await forumModel.create(newForum)
    }

    /* Submits a post to a specific subforum, returns updated forum if successful - bool false otherwise.*/
    async submitPost(forum: string, p: Post): Promise<false | Forum> {
        const query = {title : forum};
        /* Finds the forum and pushes new post to list of posts */
        const result = await forumModel.updateOne(query,{ $push: {posts : p}});
        if(result.acknowledged){ // Successfully added, now fetch updated forum object
            const getUpdatedForum = await forumModel.findOne(query);
            if(getUpdatedForum===null){ // Between push and fetch something has happened, return false
                return false
            }
            return getUpdatedForum;
        } // Push failed, return false
        return false;
    }
}
export function makeForumService() : IForumService{
    return new ForumDBService();
}