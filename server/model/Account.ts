export interface IAccount{
    username : string;
}
/**
 * An Account object contains only non-sensitive information. It has the username of the account and role.
 */
export class Account implements IAccount{
    username : string; // The login-name for the user
    password : string;
    /**
     * Creates a new Account object. Does not contain any sensitive information.
     * @param username The username of the account
     */
    constructor(username: string, password : string) {
    this.username = username;
    this.password = password;
    }
}