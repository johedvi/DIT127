import express, { Request, Response } from "express";
import session from "express-session";
import { makeAccountService } from "../service/accountService";
export const userRouter = express.Router();

const accountService = makeAccountService();

interface Account {
        username : string
        password : string
}

type LoginRequest = Request & {
        body: {
                username : string
                password : string
        }
        session : {
                user ?: Account
        }
}

/*  */  
userRouter.get("/", async(
        req : Request<{},{},{}>, 
        res : Response
        ) => {
        try{
                res.status(200).send("Blank page");
        }catch(e: any){
                res.status(500).send("Bad response from Login page - server error");
        }
});

/* Log into an existing account */
userRouter.post("/", async(
        req : LoginRequest,
        res : Response
)=>{
        try{
                if(typeof(req.body.username)!=="string"){
                        res.status(400).send(`Bad POST to login - username is not of type 'string'.`);
                        return;
                }
                if(typeof(req.body.password)!=="string"){
                        res.status(400).send(`Bad POST to login - password is not of type 'string'.`);
                        return;
                }
                const userExists = await accountService.userExists(req.body.username);
                if(userExists===false){
                        res.status(404).send(`Bad POST to login - user ${req.body.username} does not exist.`);
                        return;
                }
                req.session.user = userExists; // Assign session ID / cookie to logged-in user.
                res.status(200).send(userExists);
        }catch(e:any){
                res.status(500).send(e.message);
        }
});

/* Create a new account */
userRouter.put("/", async (req : Request<{},{},{username : string, password : string}>, res : Response<Account | String>) => {
        try{
                if(typeof (req.body.username) !== "string"){
                        res.status(400).send(`Bad PUT to login - username is not of type 'string'.`);
                        return;
                }
                if(typeof (req.body.password) !== "string"){
                        res.status(400).send(`Bad PUT to login - password is not of type 'string'.`);
                        return;
                }
                const accountCreationResult = await accountService.createAccount(req.body.username,req.body.password);
                if(accountCreationResult===false){
                        res.status(409).send(`Bad PUT to login - username ${req.body.username} is already taken.`);
                        return;
                }
                res.status(201).send(accountCreationResult);
        }catch(e:any){
                res.status(500).send(e.message);
        }
});