import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactRouter from 'react-router-dom';

interface Forum{
  title : string;
  description : string;
  owner : string;
  posts : Array<Post>;
}

interface Post{
  title : string;
  description : string;
  comments : [];
}

function App() {
  const [forums,setForums] = useState<Forum[]>([]);

  useEffect(()=>{
    async function updateForums(){
    const response = await axios.get<Forum[]>("http://localhost:8080/forum");
    setForums(response.data);
    }
    updateForums();
  },[])

  return (
	//import ('./App.css'),
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
      </div>
    </>
  );
}

function DisplayForum(forum : Forum){
  return <li><a href={'forum/'+forum.title}>{forum.title}</a> - {forum.description}</li>
}
export default App;
