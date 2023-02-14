import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import './main.css';
import Homepage from "./homepage";
import Home from "./Home";
import Page1 from "./page1";
import Page2 from "./page2";
import Forums from "./Forums";
import ForumPage from "./ForumPage";


function Navbar() {
  return (
    <Router>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" />
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                <img src="public/icon.png" id="logo"/>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="Forums">Forums</Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="#merch">Merch</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Help
              </a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">FAQ</a></li>
                <li><a className="dropdown-item" href="#">Report a user</a></li>
                <li><hr className="dropdown-divider"/></li>
                <li><a className="dropdown-item" href="#">Contact</a></li>
              </ul>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
            <button className="btn btn-outline-primary" type="submit">Search</button>
          </form>
          <button className="btn btn-outline-secondary" type="submit">COGWHEEL</button>
          <button className="btn btn-outline-danger" type="submit">Sign in</button>
        </div>
      </div>

        <Link to="Home">Home</Link>
        <br></br>
        <Link to="page1">Link to page1</Link>
        <br></br>
        <Link to="page2">Link to page2</Link>
      </nav>

      <Routes>
      <Route path="/" element={<Homepage />}></Route>
        <Route path="/page1" element={<Page1 />}></Route>
        <Route path="/page2" element={<Page2 />}></Route>
        <Route path="/Home" element={<Home />}></Route>
        <Route path="/Forums" element={<Forums />}></Route>
        <Route path="/forum/:forumId" element={<ForumPage />}></Route>
      </Routes>
    </Router>

  )
}

export default Navbar
