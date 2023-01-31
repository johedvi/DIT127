import { Account } from "../model/Account";
export interface IAccountService {
    /* Retrieve non-confidential information on a user */
    getPublicInfo() : Promise<Account>;

    // Change account details such as bio, name, etc. True if successful.
    // False if changes can't be made.
    accountDetails() : Promise<Account>;

    // Change a users account password. True if successful.
    // False if new password don't meet requirements.
    changePassword() : Promise<boolean>;
}

class AccountService implements IAccountService{

    async getPublicInfo(): Promise<Account> {
        return new Account("user","password");
    }

    async accountDetails(): Promise<Account> {
        return new Account("user","password");
    }

    async changePassword(): Promise<boolean> {
        return false;
    }
}