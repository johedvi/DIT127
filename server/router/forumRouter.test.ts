import { Forum } from "../model/Forum";
import { Post } from "../model/Post";
import { Comment } from "../model/Comment";
import * as SuperTest from "supertest";
import { app } from "../index";
const request = SuperTest.default(app);

test("End-to-end forum creation test", async () => {
    const t = "Cooking";
    const d = "For all of us who love to cook!";
    const o = "John Bull";
    const jsonSend = {"title" : t, "description" : d, "author" : o};
    const res1 = await request.put("/forum").send(jsonSend);
    expect(res1.statusCode).toEqual(201);
    expect(res1.body.title).toEqual(t);
    expect(res1.body.description).toEqual(d);
    expect(res1.body.author).toEqual(o);
    const res2 = await request.get("/forum");
    expect(res2.statusCode).toEqual(200);
    expect(res2.body.map((forum : Forum) => forum.title)).toContain(t);
    expect(res2.body.map((forum : Forum) => forum.description)).toContain(d);
    expect(res2.body.map((forum : Forum) => forum.author)).toContain(o);
});

test("End-to-end post creation test", async() => {
    const getForums = await request.get("/forum");
    const postTitle = "My recipe";
    const postContent = "Mix rum and coke";
    const postAuthor = "John Bull";
    const toForum = "Cooking";
    const jsonSend = {"title" : postTitle, "content" : postContent, "author" : postAuthor};
    const res1 = await request.put("/forum/"+toForum+"/post").send(jsonSend);
    expect(res1.statusCode).toEqual(201); // Post successfully created
    const getPosts : Post[] = res1.body.posts;
    const retrievePost = getPosts.find(p=>p.title==postTitle);
    expect(retrievePost).toBeDefined();
    expect(retrievePost?.title).toEqual(postTitle);
    expect(retrievePost?.content).toEqual(postContent);
    expect(retrievePost?.author).toEqual(postAuthor);
})

test("End-to-end comment creation test", async() => {
    const commentAuthor = "John Bull";
    const commentContent = "Tastes awful";
    const toForum = "Cooking";
    const toPost = "My recipe";
    const jsonSend = {"author" : commentAuthor, "content" : commentContent};
    const res1 = await request.put("/forum/"+toForum+"/post/"+toPost+"/comment").send(jsonSend);
    expect(res1.statusCode).toEqual(201);
    expect(res1.body).toBeDefined();
    const getComment : Comment = res1.body;
    expect(getComment.author).toEqual(commentAuthor);
    expect(getComment.content).toEqual(commentContent);
})