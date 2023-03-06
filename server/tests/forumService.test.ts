import { Forum } from "../model/Forum";
import { Post } from "../model/Post";
import { Comment } from "../model/Comment";
import { makeForumService } from "../service/forumService";
import { makeAccountService } from "../service/accountService";
import { conn } from "../db/conn";
const forumService = makeForumService();
/*
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
    const post = new IPost(t,c,a);
    await forumService.submitPost("Cooking",post);
    const forum = await forumService.findForum("Cooking");
    if(forum === undefined){ // Should be able to retrieve forum 
        expect(forum).toBe(!undefined); // Should exist, if not return as failure!
    }
    else{
        expect(forum.posts.some((p=>post.title==t))).toBeTruthy();
    }
})

test("If a comment is made on a post then it will be added to that specific posts' list of comments.",
async()=>{
    const author = "John Bull";
    const content = "Tastes awful";
    const comment = new Comment(author,content);
    const forums = await forumService.getForums();
    const forumSpecific = forums.find((f)=>f.title==="Cooking");
    const postSpecific = forumSpecific?.posts.find((p)=>p.title=="My recipe");
    const result = postSpecific?.addComment(comment);
    const findComment = postSpecific?.comments.find((t)=>t.author==author&&t.content==content);
    if(!result){
        expect(findComment).toBe(!undefined); // Comment should exist, we want this to return as a failure!
    }
    else{
        expect(findComment).toBe(comment);
    }
})
*/
const user = {username : 'ForumServiceUser', password : 'ForumServicePass'};
const forum = {title : 'ForumService', description : 'Forum Service test'};

beforeAll(async()=>{
    conn.useDb('test');
    await conn.model('Account').findOneAndDelete({username : user.username});
    await conn.model('Forum').findOneAndDelete({title : forum.title});

    await conn.model('Account').create(user);
})

test("Forum Service - Forum Creation test",async()=>{
    const response = await forumService.createForum(forum.title,forum.description,user.username);
    expect(response!==undefined);
    if(response===undefined){fail('Forum Service - Forum creation failed')};

    expect(response.title).toEqual(forum.title);
    expect(response.description).toEqual(forum.description);
    expect(response.author).toEqual(user.username);
});

