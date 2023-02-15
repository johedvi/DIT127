export class Account {
    username : string;
    password : string;

    constructor(username: string, password: string) {
    this.username = username;
    this.password = password;   
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