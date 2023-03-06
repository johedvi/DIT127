import { makeAccountService } from "../service/accountService";
import { accountModel } from "../db/account.db";
import { conn } from "../db/conn";
const accountService = makeAccountService();

// Service prevents access to password so direct access to database is required
interface TestAccount{
    username : string,
    password : string
}

const user = {username : 'AccountServiceUser', password : 'AccountServicePass'};

beforeAll(async()=>{
    conn.useDb('test');
    conn.model('Account').findOneAndDelete({username : user.username});
})

/* Valid means it isn't taken (Username) and is accepted by the validity check (Username & Password). */
test("Account Service - Create new Account & confirm database presence test",
async()=>{
    const response = await accountService.createAccount(user.username,user.password); // Create the account
    expect(response!==false);
    if(response===false){fail('Valid account creation failed');} // Account failed to be created
    expect(response.username===user.username);

    const findInDB = await accountService.getUserInfo(user.username); // Check if its in the database
    expect(findInDB!==undefined);
    if(findInDB===undefined){fail('Account was not found in the database');} // Not found in DB
    expect(findInDB.username===user.username);
});

test("Account Service - User login test",async()=>{
    const response = await accountService.userLogin(user.username,user.password);
    if(response===null){fail('Valid login credentials failed to match with database');}
    expect(response.username===user.username); //Login succeeded
});

test("Account Service - User password change test",async()=>{
    const newPassword = "NewValidPassword";
    const response = await accountService.changePassword(user.username,user.password,newPassword);
    expect(response===true);

    const findInDB : TestAccount|null = await accountModel.findOne({username : user.username});
    expect(findInDB!==null);
    if(findInDB===null){fail('Account not found in database');}
    expect(findInDB.password===newPassword);
})