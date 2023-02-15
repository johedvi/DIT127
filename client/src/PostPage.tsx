import axios from "axios";
import React, {useState} from "react";
import {useParams} from "react-router-dom"

function App(){
    interface Post{
        title : string,
        content : string,
        author : string
    }

    const {forumId, postId} = useParams();
    const defaultPost = {title : "title", content : "content" , author : "author"}
    const [posts, setPosts] = useState<Post>(defaultPost);

    async function getPost(){
        const getPost = (postId==null) ? "" : postId;
        const getForum = (forumId==null) ? "" : forumId;

        const response = await axios.get("http://localhost:8080/forum/"+getForum+"/post/"+getPost);
        setPosts(response.data);
    }
    getPost();
    return(
        <div>
            <h1>{postId}</h1>
            <h2>{posts.title}</h2>
            <h3>{posts.author}</h3>
            <p>{posts.content}</p>
        </div>
    );
}

export default App;