export class Account {
    username : string; // The login-name for the user
    password : string; // The password for the account
    //id       : number; // Unique identifier for back-end purposes. First user is 0, second user 1, and so on

    constructor(username: string, password: string, id : number) {
    this.username = username;
    this.password = password; 
    //this.id       = id;
    }

    /* Update password granted given password is correct and new password is not equal old password */
    updatePassword(oldPassword : string, newPassword : string){
        if(this.password===newPassword||this.password!=oldPassword){
            return false;
        }
        this.password=newPassword;
        return true;
    }
}