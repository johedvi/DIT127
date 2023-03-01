import { Schema, Model } from "mongoose"
import { Comment } from "../model/Comment" 
import { conn } from "./conn";
import { Account } from "../model/Account";

const commentSchema : Schema = new Schema({

    author : {
        type : Schema.Types.ObjectId,
        ref: 'Account',
        required: true
    },

    content : {
        type: String,

        required: true
    },

    rating : {
        type: Number,
        required: false
    },

    ratees : [{
        type : Schema.Types.ObjectId,
        ref : 'Account',
        required : false
      }],
})

export const comment = conn.model<Comment>("Comment", commentSchema);