import axios from "axios";
import React, { useState } from "react"
import { useNavigate } from "react-router-dom";

interface Account {
  username : string
  password : string
}

export default function (props: {}) {
  const navigate=useNavigate();
  enum pageType {
    signin,
    signup,
  }
  enum errorType{
    none,
    signin,
    signup,
  }
  const [authMode, setAuthMode] = useState(pageType.signin);
  const [errorMode,setErrorMode] = useState(errorType.none);
  const [userName, setUserName] = useState("");
  const [passWord, setPassWord] = useState("");

  const changeAuthMode = (toType: pageType) => {
    setAuthMode(toType);
  }

  function signin() {
    return (
      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={async e => {
          e.preventDefault();
          try {
            /* Attempt to login - fails if username does not exist or password is incorrect */
            const response = await axios.post("http://localhost:8080/login",
              {
                username: userName,
                password: passWord
              })
              navigate("/forum");
          }
          catch (e: any) {
            console.log(e.code);
            //alert("Incorrect username or password");
          }
        }}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="text-center">
              Not registered yet?{" "}
              <span className="link-primary" onClick={() => changeAuthMode(pageType.signup)}>
                Sign Up
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Username</label>
              <input onChange={(e) => {
                setUserName(e.target.value);
              }}
                type="username"
                className="form-control mt-1"
                placeholder="Enter username"
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input onChange={(e) => {
                setPassWord(e.target.value);
              }}
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
            <p className="text-center mt-2">
              Forgot <a href="#">password?</a>
            </p>
          </div>
        </form>
      </div>
    )
  }

  function signup() {
    return (
      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={async e =>{
          try{
            e.preventDefault();
            const response : Response = await axios.put("http://localhost:8080/login",
            {
              username : userName,
              password : passWord
            })
            navigate("/forum");
          }catch(e:any){
            console.log(e.message);
            console.log(e.code);
            alert("Error at sign up");
          }
        }}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign Up</h3>
            <div className="text-center">
              Already registered?{" "}
              <span className="link-primary" onClick={() => changeAuthMode(pageType.signin)}>
                Sign In
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Username</label>
              <input onChange={(e)=>{
                setUserName(e.target.value);
              }}
                type="username"
                className="form-control mt-1"
                placeholder="Username"
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input onChange={(e)=>{
                setPassWord(e.target.value);
              }}
                type="password"
                className="form-control mt-1"
                placeholder="Password"
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
            <p className="text-center mt-2">
              Forgot <a href="#">password?</a>
            </p>
          </div>
        </form>
      </div>
    )
  }

  if (authMode === pageType.signin) {
    return signin();
  }
  else {
    return signup();
  }
}