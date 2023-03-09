import { IAccount, Account } from "../model/Account";
import { accountModel } from "../db/account.db";
export interface IAccountService {
    /* Create an account with a unique username */
    createAccount(u : string, p : string) : Promise<false | IAccount>;

    /* Check if a user exists */
    userLogin(u : string, p : string) : Promise<null | IAccount>;

    // Change a users account password. True if successful.
    // False if new password don't meet requirements.
    changePassword(a : string, op : string, np : string) : Promise<boolean>;

    // Returns the users non-sensitive information, undefined otherwise
    getUserInfo(a : string) : Promise<undefined | IAccount>;

    // Deletes the users account, clears contents of their comments and posts
    // If they own a forum then it will be transfered to special admin account
    deleteAccount(u : string, p : string) : Promise<boolean>;
}

/** @class */
class AccountDBService implements IAccountService {
    /**
     * Creates a new Account document in the database with the specified username and password.
     * Returns an Account object if successful, false otherwise.
     * @async
     * @param {string} u The username of the account
     * @param {string} p The password for the account
     * @returns {Promise<Account | false>} If creation successful, return Account
     */
    async createAccount(u: string, p: string): Promise<false | IAccount> {
        const newAccount = new Account(u,p);
        const response = (await accountModel.create(newAccount)).username
        if(response===null){ // Account already exists
            return false;
        }
        return newAccount;
    }

    /**
     * Checks if an account exists, and that the passwords match.
     * Used for authorization / logging in to an account
     * @async
     * @param {string} u The username of the account
     * @param {string} p The password for the account
     * @returns {Promise<IAccount | null>} Return the account if it exists, otherwise null
     */
    async userLogin(u : String, p : String): Promise<null | IAccount> {
        const reply = await accountModel.findOne({username : u, password : p},'username');
        return reply;
    }

    /**
     * Change password of a given account
     * @async
     * @param {string} a The username of the account
     * @param {string} op The original password for the account
     * @param {string} np The new password for the account
     * @returns {Promise<boolean>} Returns true if account exists, otherwise null
     */
    async changePassword(a: string, op: string, np: string): Promise<boolean> {
        const response = await accountModel.findOneAndUpdate({username : a, password : op},{password: np},{new : true});
        if(response===null){return false;} // Account doesn't exist
        return true;
    }

    /**
     * Retrieves a user's non-sensitive information such as username, settings and preferences.
     * Returns undefined if not found.
     * @async
     * @param {string} username The specified user's username to retrieve information from
     * @returns The user information if found, undefined otherwise
     */
    async getUserInfo(username: string): Promise<Account | undefined> {
        const response = await accountModel.findOne({username : username}).select(['username']);
        if(response===null){
            return undefined;
        }
        return response;
    }

    /**
     * Deletes the user's account, clearing content from their posted posts & comments.
     * Any forums they owned will have their ownership transferred to admin account.
     * @async
     * @param {string} username The specified user's username
     * @param {string} password The password of the user's account
     * @returns True if deletion is successful, False otherwise.
     */
    async deleteAccount(username : string, password : string) : Promise<boolean>{
        return true;
    }
}

export function makeAccountService(){
    return new AccountDBService();
}