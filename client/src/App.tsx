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
import Navbar from './Navbar';
import Homepage from './homepage';

axios.defaults.withCredentials = true; // For session cookies

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

class Start extends React.Component {
  render() {
    return (
      <>
      <Navbar></Navbar>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/forum" element={<Forums />}></Route>
          <Route path="/forum/:forumId" element={<ForumPage />}></Route>
          <Route path="/forum/:forumId/post/:postId" element={<PostPage />}></Route>
        </Routes>
      </Router>
      </>
    )
  }
}
export default Start;