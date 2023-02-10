import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

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
    const response = await axios.get<Forum[]>("http://localhost:3000/forum");
    setForums(response.data);
    }
    updateForums();
  },[])

  return (
    <div>
      <h1> Forums </h1>
      <ul>
        {forums.map((forum) => <DisplayForum 
        key = {forum.title} 
        title={forum.title} 
        description={forum.description} 
        owner={forum.owner} 
        posts={forum.posts}/>)}
      </ul>
    </div>
  );
}

function DisplayForum(forum : Forum){
  return <li>{forum.title} - {forum.description}</li>
}

export default App;
