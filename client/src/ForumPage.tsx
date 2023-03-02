import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactRouter, { redirect, useParams } from 'react-router-dom';

interface Forum{
  title : string;
  description : string;
  author : string;
  users : Array<string>;
  posts : Array<Post>;
}
interface Post{
  id : number,
  title : string;
  author : string;
  comments : number;
}
let forumString : string;
function App() {
  const { forumId } = useParams();
  const [page,setForums] = useState<Forum>();

  const [postTitle, setTitle] = useState<String>();
  const [postBody, setBody] = useState<String>();

  async function updateForums(){  
    const response = await axios.get<Forum>("http://localhost:8080/forum/"+forumId?.toString());
    console.log(response);
    setForums(response.data);
  }

  useEffect(()=>{
    updateForums();
  },[])
  
  return (
    <>
      <div>
      <h2>{"Welcome to - " + page?.title}</h2>
      <h3>{page?.description + " - " + page?.author}</h3>
        <form onSubmit={async e => {
          e.preventDefault();
          await axios.put("http://localhost:8080/forum/"+forumId+"/post", {fid : forumId, title: postTitle, content: postBody}); updateForums();
        }}>
          <label>Post Title</label>
          <input type="text" onChange={(e) => {
            setTitle(e.target.value);
          }}/>
          <label>Post Body</label>
          <input type="text" onChange={(e) => {
            setBody(e.target.value);
          }}/>
          <input type="submit" value="Post!"/>
        </form>

    

        {page?.posts.map((post) => <DisplayPosts
          key={post.id}
          id={post.id}
          title={post.title}
          author={post.author}
          comments={post.comments}
          />)}
      </div>
    </>
  );

  function DisplayPosts(post : Post) {
    return <li><a href={"/forum/"+page?.title+"/post/"+post.id}>{post.title}</a>
    {" posted by "}
    <a href={"/profile/"+post.author}>{post.author}</a>
    </li>
  }
}


export default App;
