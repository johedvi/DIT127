import axios from "axios";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom"
interface Comment{
    author : string,
    content : string,
    rating : number
}
function App(){
    interface Post{
        title : string,
        content : string,
        author : string,
        comments : Comment[]
    }

    const {forumId, postId} = useParams();
    const defaultPost = {title : "title", content : "content" , author : "author", comments : []}
    const [posts, setPosts] = useState<Post>(defaultPost);

    async function getPost(){
        const getPost = (postId==null) ? "" : postId;
        const getForum = (forumId==null) ? "" : forumId;

        const response = await axios.get("http://localhost:8080/forum/"+getForum+"/post/"+getPost);
        setPosts(response.data);
    }
    useEffect(()=>{
        getPost();
    },[])
    
    return(
        <div>
            <h1>{postId}</h1>
            <h3>{posts.author}</h3>
            <p>{posts.content}</p>

            {posts.comments.map((comment) => <DisplayComment
                author={comment.author}
                content={comment.content}
                rating={comment.rating}
            />)}
        </div>
    );
}

function DisplayComment(comment : Comment) {
    return <li><p>comment.author <br></br>comment.content</p></li>
}
export default App;