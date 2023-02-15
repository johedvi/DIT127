import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

/*
Site imports
*/
import Forums from "./Forums";
import ForumPage from "./ForumPage";
import PostPage from "./PostPage";

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
  /* What do to whenever the site updates */
  useEffect(() => {
    
  }, [])

  return (
    <Router>
      <div>
        <p>Coolt</p>
      </div>
      <Routes>
        <Route path="/" element={<div><p>Hej</p></div>}></Route>
        <Route path="/forum" element={<Forums/>}></Route>
        <Route path="/forum/:forumId" element={<ForumPage/>}></Route>
        <Route path="/forum/:forumId/post/:postId" element={<PostPage/>}></Route>
      </Routes>
    </Router>
  )
}

function Index(){
  return (
    <div>
      <p>hej</p>
    </div>
  )
}

export default App;
