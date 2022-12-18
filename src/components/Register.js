import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function Register() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [alert, setAlert] = useState("none")
  const [authenticated, setAuthenticated] = useState(false);

  const history = useHistory();

  const signup = async (e) => {
    e.preventDefault();

    if ((!username || !password || !firstName || !lastName || !email)) {
      setMessage("Some fields are missing. Try again!");
      setAlert("flex");
    } else if (password !== password2) {
      setMessage("The passwords do not match. Try again!");
      setAlert("flex"); 
    } else {
      const res = await fetch("https://mysql-blogger.herokuapp.com/api/register", {
        method: "POST",
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          password: password,
          firstName: firstName,
          lastName: lastName,
          email: email,
        }),
      })
      const data = await res.json();
      if(data.success) {
        setAlert("none");
        history.push("/userpage");
      } else {
        setMessage("Registration failed. Check your connection.");
        setAlert("flex");
      }
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
        <div className="credentials" style={{marginTop: "80px"}}>
          <div className="credentials-header">
            <h1>Blogger</h1>
          </div>
          <div className="SignOrReg">
            <div className="form-title">
                <h2>Register</h2>
            </div>
            <div className="form-body-signin">
              <form onSubmit={signup}>
                  <label>Username</label>
                  <input type="text" onChange={(e) => {setUsername(e.target.value)}}></input>
                  <label>Password</label>
                  <input type="password" onChange={(e) => {setPassword(e.target.value)}}></input>
                  <label>Re-enter Password</label>
                  <input type="password" onChange={(e) => {setPassword2(e.target.value)}}></input>
                  <label>First Name</label>
                  <input type="text" onChange={(e) => {setFirstName(e.target.value)}}></input>
                  <label>Last Name</label>
                  <input type="text" onChange={(e) => {setLastName(e.target.value)}}></input>
                  <label>Email</label>
                  <input type="text" onChange={(e) => {setEmail(e.target.value)}}></input>
                  <div className="center-button">
                      <button className="submit-button" type="submit">Submit</button>
                  </div>
              </form>
              <a href="/"><p style={{textAlign: "center"}}>Registered already? Sign in.</p></a>
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
  
export default Register;