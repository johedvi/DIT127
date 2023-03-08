import { Post } from "../model/Post";
import { Forum } from "../model/Forum";
import { Account } from "../model/Account";
import { Comment } from "../model/Comment";
import { makeForumService } from "../service/forumService";
import { makePostService } from "../service/postService";
import { commentModel } from "../db/comment.db";
import { accountModel } from "../db/account.db";
import { forumModel } from "../db/forum.db";
import { postModel } from "../db/post.db";

const postService = makePostService();
const forumService = makeForumService();

const user = new Account('PostServiceUser','PostServicePassword');
const forumJson = {title : 'Post Service Forum Test', content : 'Post Service Forum Description'};
const postId = Date.now().valueOf();
const postJson = {id : postId, title : 'Post Service Post Test', content : 'Post Service Post Content'};
const comment = new Comment(user,"Post Service Test Comment");

// Teardown & setup post service tests
beforeAll(async()=>{
    await commentModel.findOneAndDelete({id : comment.id});
    await postModel.findOneAndDelete({id : postId});
    await accountModel.findOneAndDelete({username : user.username});
    await forumModel.findOneAndDelete({title : forumJson.title});
    
    const userObject = await accountModel.create(user);
    const forum = new Forum(forumJson.title,forumJson.content,userObject);
    await forumModel.create(forum);
});


// Ensure that the created post exists in the list of posts of the forum
test("Post Service - User can create a post on a forum",async()=>{
    const findUser = await accountModel.findOne({username : user.username});
    if(findUser===null){fail('Post Service - Test account was not found.')};

    const post = new Post(postJson.id,postJson.title,postJson.content,findUser);
    const response = await forumService.submitPost(forumJson.title,post);
    if(response===false){fail('Post Service - Failed to create post on forum')};

    expect(response.posts.map((post : Post)=>post.id)).toContain(post.id);
    expect(response.posts.map((post : Post)=>post.title)).toContain(post.title);
    expect(response.posts.map((post : Post)=>post.content)).toContain(post.content);
    expect(response.posts.map((post : Post)=>post.author)).toContain(post.author.username);
});

// Ensure the post can be received from post service
test("Post Service - Post can be retrieved",async()=>{
    const response = await postService.getPost(postJson.id);
    if(response===undefined){fail('Post Service - Failed to retrieve existing post')};

    expect(response.author).toEqual(user.username);
    expect(response.title).toEqual(postJson.title);
});

// Ensure that a user can post a comment on a post
test("Post Service - Comment can be created on a post",async()=>{
    const findUser = await accountModel.findOne({username : user.username});
    if(findUser===null){fail('Post Service - Failed to retrieve user')};

    const response = await postService.submitComment(postId,findUser,'Post Service Comment Test');
    if(response===false){fail('Post Service - Failed to comment on a post')};

    expect(response.comments).toContain(comment);
    //await commentModel.findOneAndDelete({id : getCommentId});
})