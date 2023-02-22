import {Schema, Model} from "mongoose";

import {Account} from "../model/Account";

import { conn } from "./conn";


const accountSchema : Schema = new Schema({

 id : {

 type : String,

 required : true,

 unique: true

 },

 password : {

 type : String,

 required : true

 },


});





export const accountModel = conn.model<Account>("Account", accountSchema);