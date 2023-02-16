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
  content : string;
  comments : [];
}
let forumString : string;
function App() {
  const { forumId } = useParams();
  forumString = forumId?.toString()!;
  const [page,setForums] = useState<Forum>();

  const [postTitle, setTitle] = useState<String>();
  const [postBody, setBody] = useState<String>();

  async function updateForums(){
    
    const response = await axios.get<Forum>("http://localhost:8080/forum/"+forumId?.toString());
    setForums(response.data);
  }

  useEffect(()=>{
    updateForums();
  },[])

  return (
    <>
      <div>
        <h1>{page?.title}</h1>
        <form onSubmit={async e => {
          e.preventDefault();
          await axios.put("http://localhost:8080/forum/"+forumId+"/post", { title: postTitle, content: postBody, author: "John Doe" }); updateForums();
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
          key={post.title}
          title={post.title}
          content={post.content}
          comments={post.comments}
          />)}
      </div>
    </>
  );
}

function DisplayPosts(post : Post) {
  return <li><a href={"/forum/"+forumString+"/post/"+post.title}>{post.title}</a></li>
}
export default App;
