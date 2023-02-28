import { Account } from "../model/Account";
import { accountModel } from "../db/account.db";
export interface IAccountService {
    /* Create an account with a unique username */
    createAccount(u : string, p : string) : Promise<false | Account>;

    /* Checks if a specified username is already taken */
    usernameTaken(u : string) : Promise<boolean>;

    /* Check if a user exists */
    userLogin(u : string, p : string) : Promise<null | Account>;

    // Change a users account password. True if successful.
    // False if new password don't meet requirements.
    changePassword(a : string, op : string, np : string) : Promise<boolean>;
}

class AccountDBService implements IAccountService {
    async createAccount(u: string, p: string): Promise<false | Account> {
        const newAccount = new Account(u);
        const response = await accountModel.create({username : u, password : p})
        if(response===null){ // Account already exists
            return false;
        }
        return newAccount;
    }

    async usernameTaken(u: string): Promise<boolean> {
        const response = accountModel.findOne({username : u});
        if(response===null){return false;} // Username doesn't exist
        return true;
    }

    /* Checks if an account exists. Returns the account if true, null otherwise. */
    async userLogin(u : String, p : String): Promise<null | Account> {
        return accountModel.findOne({username : u, password : p});
    }

    async changePassword(a: string, op: string, np: string): Promise<boolean> {
        const response = accountModel.findOneAndUpdate({username : a, password : op}, {password : np});
        if(response===null){return false;} // Account doesn't exist
        return true;
    }
}

export function makeAccountService(){
    return new AccountDBService();
}