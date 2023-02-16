import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactRouter, { useParams } from 'react-router-dom';

interface Forum{
  title : string;
  description : string;
  owner : string;
  posts : Array<Post>;
}
interface Post{
  title : string;
  description : string;
  author : string;
  comments : [];
}
function App() {
  const { forumId } = useParams();
  const [page,setForums] = useState<Forum>();

  const [postTitle, setTitle] = useState<String>();
  const [postBody, setBody] = useState<String>();
  const [postAuth, setAuth] = useState<String>();

  async function updateForumInfo(){
    const response = await axios.get<Forum>("http://localhost:8080/forum/"+forumId?.toString());
    setForums(response.data);
  }

  function DisplayPosts(post : Post){
    return <li><a href={"/forum/"+forumId+"/post/"+post.title}>{post.title}</a> - {post.author}</li>
  }

  useEffect(()=>{
    updateForumInfo();
  },[])

  return (
	//import ('./App.css'),
    <>
      <div>
        <h1>{page?.title}</h1>
        <h2>Posts</h2>
        <ul>
          {page?.posts.map((post) => <DisplayPosts
            key={post.title}
            title={post.title}
            description={post.description}
            author={post.author}
            comments={post.comments}
            />)}
        </ul>
        <form onSubmit={async e => {
          e.preventDefault();
          await axios.put("http://localhost:8080/forum/"+forumId+"/post", { title: postTitle, content: postBody, author: postAuth }); 
          updateForumInfo();
        }}>
          <label>Post Title</label>
          <input type="text" onChange={(e) => {
            setTitle(e.target.value);
          }}/>
          <label>Post Body</label>
          <input type="text" onChange={(e) => {
            setBody(e.target.value);
          }}/>
          <label>Post Author</label>
          <input type="text" onChange={(e)=>{
            setAuth(e.target.value);
          }}/>
          <input type="submit" value="Post!"/>
        </form>
      </div>
    </>
  );
}

export default App;
