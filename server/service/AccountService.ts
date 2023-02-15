import { Account } from "../model/Account";
export interface IAccountService {
    /* Create an account with a unique username */
    createAccount(u : string, p : string) : Promise<Account | boolean>;

    /* Retrieve non-confidential information on a user */
    getPublicInfo() : Promise<String[]>;

    /* Check if a user exists */
    userExists(a : string) : Promise<Account | boolean>;

    // Change a users account password. True if successful.
    // False if new password don't meet requirements.
    changePassword(a : string, op : string, np : string) : Promise<boolean>;
}

class AccountService implements IAccountService{
    accounts : Array<Account> = [];

    /* Create a new account */
    async createAccount(u: string, p: string): Promise<boolean | Account> {
        const nameTaken = this.accounts.find((acc)=>acc.username===u);
        if(nameTaken===undefined){
            const newAccount = new Account(u,p);
            this.accounts.push(newAccount);
            return newAccount;
        }
        return false; // Name taken
    }

    /* Retrieve all existing usernames */
    async getPublicInfo(): Promise<String[]> {
        const usernames = this.accounts.map((acc)=>acc.username);
        return usernames;
    }

    /* Checks if a user exists, returns the account if so */
    async userExists(a: string): Promise<boolean | Account> {
        const exists = this.accounts.find((acc)=>acc.username===a);
        if(exists==null){
            return false;
        }
        return exists;
    }

    /* Attempt to change a users password */
    async changePassword(username : string, oldPassword : string, newPassword : string): Promise<boolean> {
        const exist = this.accounts.find((acc)=>acc.username===username);
        if(exist==null){
            return false;
        }
        return exist.updatePassword(oldPassword,newPassword);
    }
}

export function makeAccountService(){
    return new AccountService();
}