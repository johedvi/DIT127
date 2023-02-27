import {Schema, Model} from "mongoose";

import { Account } from "../model/Account";
import {Forum} from "../model/Forum";
import {Post} from "../model/Post";

import { conn } from "./conn";


const forumSchema : Schema = new Schema({

 title : {

 type : String,

 required : true,

 unique : true

 },

 description : {

 type : String,

 required : true

 },

 
author : {
  type : Schema.Types.ObjectId, 
  ref: 'Account',
  required : true
},

users : [{
  type : Schema.Types.ObjectId,
  ref: 'Account',
  required : true
}],

 posts : [{
  type : Schema.Types.ObjectId,
  ref: 'Post',
  required : true
 }]});

export const forumModel = conn.model<Forum>("Forum", forumSchema);