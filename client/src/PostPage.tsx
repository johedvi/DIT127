import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getCommentRange } from "typescript";
interface IComment {
    author: String,
    content: String,
    rating: number
}
interface IPost {
    id: number, // Unique ID of the post, used to find the specific post
    title: string, // The title of the post (length 1 to 128)
    content: string, // Body of the post (length 1 to 15000)
    author: string, // User who created the post
    comments: IComment[] // List of comments from users
}
function App() {

    const { forumId, postId } = useParams();
    const [commentBody, setBody] = useState<String>();

    const defaultPost = { id: -1, title: "Loading...", content: "Loading...", author: "Loading...", comments: [] }
    const [posts, setPosts] = useState<IPost>(defaultPost);

    /* Fetches new/updated Post object */
    async function getPost() {
        const getPost = (postId == null) ? "" : postId;
        const getForum = (forumId == null) ? "" : forumId;

        const response = await axios.get("http://localhost:8080/forum/" + getForum + "/post/" + getPost);
        setPosts(response.data);
    }

    useEffect(() => {
        getPost();
    }, [])

    return (
        require("./css/postPage.css"),
        <div>
            <h1>{posts.title}</h1>
            <h3>{"Posted by " + posts.author}</h3>
            <div className="post">
                <p className="postContent">{posts.content}</p>
            </div>


            
            <form id="createComment" onSubmit={async e => {
                try {
                    e.preventDefault();
                    await axios.put("http://localhost:8080/forum/" + forumId + "/post/" + postId + "/comment", { content: commentBody });
                    getPost();
                } catch (e: any) {
                    switch(e.response.status){
                        case 401 : alert("Please sign in before commenting"); break;
                        default : alert("Unexpected error when commenting"); break;
                    }
                }
            }}>
                <label>Post Comment</label>
                <input type="text" onChange={(e) => {
                    setBody(e.target.value);
                }} />
                <input type="submit" value="Comment!" />
            </form>

            <h4>{"Comments"}</h4>
            {posts.comments.map((comment) => <DisplayComment
                author={comment.author}
                content={comment.content}
                rating={comment.rating}
            />)}
        </div>
    );
}

function DisplayComment(comment: IComment) {
    return <li className="comment"><a href={"/profile/"+comment.author}>{"posted by " + comment.author}</a> 
    <p className="rating"><a href="#" onClick={upVote}>{String.fromCharCode(8593)}</a>{" Rating: " + comment.rating + " "}<a href="#" onClick={upVote}>{String.fromCharCode(8595)}</a></p>
    <p>{comment.content}</p>
    </li>
}

async function upVote() {
    // ....... some call to router?
}

async function downVote() {
    // ....... some call to router?
}
export default App;