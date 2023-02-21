import React from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import './main.css';
import Homepage from "./homepage";
import Forums from "./Forums";
import ForumPage from "./ForumPage";
import PostPage from "./PostPage";
import AccountPage from "./AccountPage"


function Navbar() {
  return (
      <><link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" /><nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">
                <img src="public/icon.png" id="logo" />
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="/forum">Forums</a>
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
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#">Contact</a></li>
              </ul>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-primary" type="submit">Search</button>
          </form>

          <button className="btn btn-outline-secondary" type="submit">COGWHEEL</button>
          <form action="/auth">
          <input className="btn btn-outline-danger" type="submit" value="Sign in"/>
          </form>
       
       
         
       
         

        </div>
      </div>
    </nav></>
  )
}

export default Navbar
