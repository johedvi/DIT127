import superagent from "superagent";
import {conn} from "./db/conn";

/* Run with 'npx ts-node setup.ts' in terminal */
const request = superagent;

/* Create forum with ID Cooking */
(async () => {
    try{
        conn.dropCollection('accounts');
        conn.dropCollection('comments');
        conn.dropCollection('forums');
        conn.dropCollection('posts');

    }catch(e:any){console.error(e);}
})();