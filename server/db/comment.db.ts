import { Schema, Model } from "mongoose"
import { Comment } from "../model/Comment" 
import { conn } from "./conn";
import { Account } from "../model/Account";

const CommentSchema : Schema = new Schema({

    author : {
        type : Account,
        required : true,
    },

    content : {

    },

    rating : {

    },

    ratees : {

    },
})