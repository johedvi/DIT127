import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

/*
Site imports
*/
import Navbar from "./Navbar";
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
    <Navbar></Navbar>
  )
}

export default App;
