import { makeForumService } from "./forumService";

test("If a forum is created then it is added to the list of all available forums",
async()=>{
    const title = "Cooking";
    const description = "For all of us who love to cook!";
    const owner = "John Bull";
    const forumService = makeForumService();
    await forumService.createForum(title,description,owner);
    const forums = await forumService.getForums();
    expect(forums.some((task=>task.title==title))).toBeTruthy();
})