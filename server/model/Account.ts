
/**
 * An Account object contains only non-sensitive information. It has the username of the account and role.
 */
export class Account {
    username : string; // The login-name for the user
    /**
     * Creates a new Account object. Does not contain any sensitive information.
     * @param username The username of the account
     */
    constructor(username: string) {
    this.username = username;
    }
}