import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getCommentRange } from "typescript";
interface Comment {
    author: string,
    content: string,
    rating: number
}
function App() {
    interface Post {
        title: string,
        content: string,
        author: string,
        comments: Comment[]
    }

    const { forumId, postId } = useParams();
    const [commentAuth, setAuth] = useState<String>();
    const [commentBody, setBody] = useState<String>();
    const defaultPost = { title: "title", content: "content", author: "author", comments: [] }
    const [posts, setPosts] = useState<Post>(defaultPost);

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
        <div>
            <h1>{postId}</h1>
            <h3>{posts.author}</h3>
            <p>{posts.content}</p>

            {posts.comments.map((comment) => <DisplayComment
                author={comment.author}
                content={comment.content}
                rating={comment.rating}
            />)}

            <h4>{"Comments"}</h4>
            <form onSubmit={async e => {
                e.preventDefault();
                await axios.put("http://localhost:8080/forum/"+forumId+"/post/"+postId+"/comment",{ author: commentAuth, content: commentBody });
                getPost();
            }}>
                <label>Post Author</label>
                <input type="text" onChange={(e) => {
                    setAuth(e.target.value);
                }} />
                <label>Post Comment</label>
                <input type="text" onChange={(e) => {
                    setBody(e.target.value);
                }} />
                <input type="submit" value="Comment!" />
            </form>
        </div>
    );
}

function DisplayComment(comment: Comment) {
    return <li>{comment.author} - {comment.content} : {comment.rating}</li>
}
export default App;