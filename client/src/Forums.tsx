import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactRouter from 'react-router-dom';
//import './forum.css';

interface Forum {
  title: string;
  description: string;
  author: string;
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

  async function updateForums() {
    const response = await axios.get<Forum[]>("http://localhost:8080/forum");
    setForums(response.data);
  }
  useEffect(() => {
    updateForums();
  }, [])
  
  return (
    require("./forum.css"), // <-- avoid importing file until necessary, avoiding unused and conflicting css
    <>
      <div>
        <h1> Forums </h1>
        <form id="createForum" onSubmit={async e => {
          try{
            e.preventDefault();
            await axios.put("http://localhost:8080/forum", { title: forumName, description: forumDesc}); updateForums();
          }catch(e:any){
            switch(e.response.status){
              case 400: alert("The title or body contains illegal characters, please try again"); break;
              case 401: alert("Please sign in before creating a forum"); break;
              case 409: alert("The forum name " + forumName + " is alrady taken, please choose another"); break;
              default : alert("Unexpected error at post creating"); break;
            }
          }
        }}>
          <div className="inputBlock">
          <label>Forum name</label>
          <input type="text" id="forumname" placeholder="Name" onChange={(e) => {
            setName(e.target.value);
          }} />
          </div>
          
          <div className="inputBlock">
          <label>Forum description</label>
          <input type="text" id="forumdesc" placeholder="Description" onChange={(e) => {
            setDesc(e.target.value);
          }} />
          </div>
          <input type="submit" value="Create" />
        </form> 

        <div className="forums">
          {forums.map((forum) => <DisplayForum
            key={forum.title}
            title={forum.title}
            description={forum.description}
            author={forum.author}
            posts={forum.posts} />)}
        </div>
      </div>
    </>
  );
}

function DisplayForum(forum: Forum) {
  return (
      <div className="forumBlock">
        <a className="forumLink" href={"/forum/"+forum.title}>
        <div className="forumTitle">
          <h2>{forum.title}</h2>
        </div></a>
        <a href={"profile/"+forum.author}>
          <div className="forumAuthor">
            <h5>{forum.author ? forum.author : "Author"}</h5>
          </div>
        </a>
        <div className="forumDescription">
          <h5>{forum.description}</h5>
        </div>
        <div className="icons">
          <a href={"#subscribe"}>
            {
              /* if (author subscribed to forum) {
                <img src="starY.png"></img>
              } */
            // else 
            <img src="star.png"></img>
            }
          </a>
        </div>
      </div>

  )
}
export default App;
