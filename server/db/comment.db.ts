import { Schema, Model, Callback } from "mongoose"
import { IComment } from "../model/Comment" 
import { conn } from "./conn";
import { Account } from "../model/Account";

const commentSchema : Schema = new Schema({

    id : Number,
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
        type : Number,
        required : true
    },

    upvoters : [{
        type : Schema.Types.ObjectId,
        ref : 'Account',
        unique : true,
        dropDups : true,
        required : true
    }],

    downvoters : [{
        type : Schema.Types.ObjectId,
        ref  : 'Account',
        unique : true,
        dropDups : true,
        required : true
    }]
})
export const commentModel = conn.model<Comment>("Comment", commentSchema);