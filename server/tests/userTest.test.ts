import { makeAccountService } from "../service/accountService";
import { makeForumService } from "../service/forumService";
require('./db/post.db');
const forumService = makeForumService();
const accountService = makeAccountService();
const username = "USERFORTESTING";
const password = "PASSWORD";
//accountService.createAccount(username, password);

// Duplicate key error, not sure what test expect to use.
test("Check if we can create user with similar username",
async()=>{
    expect(await accountService.createAccount(username, password)).rejects.toThrow();
})

test("Username taken", 
async()=>{
    expect(await accountService.usernameTaken(username)).toBeTruthy();
});

test("Attempt login",
async()=>{
    const acc = await accountService.userLogin(username, password)
    expect(acc).toBeTruthy();
});

// Works... fix connection to a seperate (testing) database so we can drop everything each test
/*test("Attempt creating forum, post and comment", 
async()=>{
    const acc = await accountService.userLogin(username, password);
    if (acc == null) fail();
    const title = "TESTFORUM";
    const description = "TESTDESCRIPTION";
    await forumService.createForum(title,description,acc.username);
    const forum = await forumService.findForum(title);
    expect(forum).toBeTruthy();
});*/


