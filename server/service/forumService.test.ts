import { Post } from "../model/Post";
import { makeForumService } from "./forumService";
const forumService = makeForumService();

test("If a forum is created then it is added to the list of all available forums",
async()=>{
    const title = "Cooking";
    const description = "For all of us who love to cook!";
    const owner = "John Bull";
    await forumService.createForum(title,description,owner);
    const forums = await forumService.getForums();
    expect(forums.some((task=>task.title==title))).toBeTruthy();
})

test("If a post is added to a forum then it is added to that forums' list of posts.",
async()=>{
    const t = "My recipe";
    const c = "Mix rum and coke!";
    const a = "John Bull";
    const post = new Post(t,c,a);
    await forumService.submitPost("Cooking",post);
    const forum = await forumService.findForum("Cooking");
    if(forum === undefined){ /* Should be able to retrieve forum */
        expect(forum).toBe(!undefined);
    }
    
})