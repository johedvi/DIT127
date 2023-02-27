import { Schema, Model } from "mongoose";
import { Account } from "../model/Account";
import { Comment } from "../model/Comment";
import { conn } from "./conn";
import { Post } from "../model/Post";


const postSchema: Schema = new Schema({

    id: {

        type: Number,

        required: true,

        unique: true

    },

    title: {

        type: String,

        required: true

    },

    content: {

        type: String,

        required: true

    },

    author: {

        type: Schema.Types.ObjectId,
        ref : 'Account',
        required: true

    },

    comments: [{
        type : Schema.Types.ObjectId,
        ref : 'Comment',
        required : false
    }]

});

export const postModel = conn.model<Post>("Post", postSchema);