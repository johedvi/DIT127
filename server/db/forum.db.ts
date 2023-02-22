import {Schema, Model} from "mongoose";

import {Forum} from "../model/Forum";
import {Post} from "../model/Post";

import { conn } from "./conn";


const forumSchema : Schema = new Schema({

 title : {

 type : String,

 required : true

 },

 description : {

 type : String,

 required : true

 },

 author : {

    type : Number,
   
    required : false,

    unique : true
   
    },

 post : {

        type :[Post] ,
       
        required : false,
    
        },

});





export const forumModel = conn.model<Forum>("Forum", forumSchema);