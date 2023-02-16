import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactRouter from 'react-router-dom';

interface Forum {
  title: string;
  description: string;
  owner: string;
  posts: Array<Post>;
}

interface Post {
  title: string;
  description: string;
  comments: [];
}

function App() {
  const [forums, setForums] = useState<Forum[]>([]);
  const [forumName, setName] = useState<String>();
  const [forumDesc, setDesc] = useState<String>();
  const [forumAuth, setAuth] = useState<String>();

  async function updateForums() {
    const response = await axios.get<Forum[]>("http://localhost:8080/forum");
    setForums(response.data);
  }
  useEffect(() => {
    updateForums();
  }, [])

  return (
    <>
      <div>
        <h1> Forums </h1>
        <ul>
          {forums.map((forum) => <DisplayForum
            key={forum.title}
            title={forum.title}
            description={forum.description}
            owner={forum.owner}
            posts={forum.posts} />)}
        </ul>
        <form onSubmit={async e => {
          e.preventDefault();
          await axios.put("http://localhost:8080/forum", { title: forumName, description: forumDesc, author: forumAuth }); updateForums();
        }}>
          <label>Forum name</label>
          <input type="text" id="forumname" onChange={(e) => {
            setName(e.target.value);
          }} /><br />
          <label>Forum description</label>
          <input type="text" id="forumdesc" onChange={(e) => {
            setDesc(e.target.value);
          }} /><br />
          <label>Your name</label>
          <input type="text" id="forumauth" onChange={(e) => {
            setAuth(e.target.value);
          }} /><br />
          <input type="submit" value="Create" />
        </form> 
      </div>
    </>
  );
}

function DisplayForum(forum: Forum) {
  return <li><a href={"/forum/"+forum.title}>{forum.title}</a> - {forum.description}</li>
}
export default App;
