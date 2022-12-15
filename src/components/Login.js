import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";


function Login() {

  const [email, setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("hidden");
  const [message, setMessage] = useState("");
  const [alert, setAlert] = useState("none")
  const [authenticated, setAuthenticated] = useState(false);

  const history = useHistory();

  const signIn = async (e) => {
    e.preventDefault();

    console.log("checking email and password entered");
    console.log(email, password);

    const res = await fetch("https://mysql-blogger.herokuapp.com/api/login", {
      method: "POST",
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password
      }),
    })
    const data = await res.json();
    if(data.success) {
      console.log("login successful");
      setAlert("none");
      history.push("/userpage");
    } else {

      setMessage("Username or password is invalid. Try again!")
      setAlert("flex");

      // if(response === true) {
      //   console.log("no message rerender");
      // } else {
      //   response = true;
      //   setMessage("flex");
      //   setTimeout(() => {
      //     setMessage("none");
      //     response = false;
      //   }, 4500);
      // }

      console.log("login failed: ", data.err);
    }
  }

  const fetchcookie = async () => {
    try{
      const res = await fetch("https://mysql-blogger.herokuapp.com/", {
        method: "GET",
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },

      })
      const data = await res.json();
      if(data.user != null){
        setAuthenticated(true);
      } else {
        console.log("user is not logged in");
        setAuthenticated(false);
      }
    } catch(err){
      console.log("error: ", err);
    }
  }

  useEffect(() => {
    if(authenticated){
      history.push("/userpage");
      return () => {
        console.log("unmounting");
        setAuthenticated(false);
      }
    } else {
      fetchcookie();
    }
  }, [authenticated]);

    return (
      <div className="default">
        <div className="credentials" style={{marginTop: "150px"}}>
          <div className="credentials-header">
            <h1>Blogger</h1>
          </div>
          <div className="SignOrReg">
            <div className="form-title">
                <h2>Log In</h2>
            </div>
              <div className="form-body-signin">
                <form onSubmit={signIn}>
                    <label>Email</label>
                    <input type="text" id="username" onChange={(e) => {setEmail(e.target.value)}}></input>
                    <label>Password</label>
                    <input type="password" id="password" onChange={(e) => {setPassword(e.target.value)}}></input>
                    <div className="center-button">
                      <button className="submit-button" type="submit">Submit</button>
                    </div>
                </form>
                <a href="/register"><p style={{textAlign: "center"}}>Not registered? Sign up.</p></a>
              </div>
          </div>
          <div class="message" style={{display: alert}}>
            <div>
              <p>{message}</p>
            </div>
          </div>
        </div>
      </div>
    );
}
  
export default Login;