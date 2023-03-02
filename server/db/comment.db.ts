import { Schema, Model } from "mongoose"
import { IComment } from "../model/Comment" 
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
        required: true
    },

    ratees : [{
        type : Schema.Types.ObjectId,
        ref : 'Account',
        required : true
      }]
})

export const commentModel = conn.model<Comment>("Comment", commentSchema);
