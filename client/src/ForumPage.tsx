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
  comments : [];
}
function App() {
  
  //const page = axios.get<Forum>("hhtp://localhost:3001/forum/${id}")

  const { forumId } = useParams();
  const [page,setForums] = useState<Forum>();

  useEffect(()=>{
    async function updateForums(){
    
    const response = await axios.get<Forum>("http://localhost:8080/forum/"+forumId?.toString());
    setForums(response.data);
    }
    updateForums();
  },[])

  return (
	//import ('./App.css'),
    <>
      <div>
        <h1>{page?.title}</h1>
      </div>
    </>
  );
}

export default App;
