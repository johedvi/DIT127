import { makeAccountService } from "./accountService";
import { accountModel } from "../db/account.db";
const accountService = makeAccountService();

interface TestAccount{
    username : string,
    password : string
}

/* Valid means it isn't taken (Username) and is accepted by the validity check (Username & Password). */
test("Create an account with a valid username and password and check that it was created in the database",
async()=>{
    const username = "ValidUsername";
    const password = "ValidPassword";
    const response = await accountService.createAccount(username,password); // Create the account
    expect(response!==false);
    if(response===false){fail('Valid account creation failed');} // Account failed to be created
    expect(response.username===username);
    const findInDB = await accountService.getUserInfo(username); // Check if its in the database
    expect(findInDB!==undefined);
    if(findInDB===undefined){fail('Account was not found in the database');} // Not found in DB
    expect(findInDB.username===username);
})

test("Updating the password for a user should change it in the database as well",async()=>{
    const username = "ValidUsername"; //User should still exist from test above
    const password = "ValidPassword";
    const newPassword = "NewValidPassword";
    const response = await accountService.changePassword(username,password,newPassword);
    expect(response===true);
    const findInDB : TestAccount|null = await accountModel.findOne({username : username});
    expect(findInDB!==null);
    if(findInDB===null){fail('Account not found in database');}
    expect(findInDB.password===newPassword);
})