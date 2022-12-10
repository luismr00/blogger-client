import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function Register() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [errMsg, setErrMsg] = useState("hidden");
  const [pwErr, setPwError] = useState("hidden");
  const [message, setMessage] = useState("");
  const [alert, setAlert] = useState("none")
  const [authenticated, setAuthenticated] = useState(false);

  const history = useHistory();

  const signup = async (e) => {
    e.preventDefault();

    if ((!username || !password || !firstName || !lastName || !email)) {
      // setErrMsg("visible");
      // setPwError("hidden");
      setMessage("Some fields are missing. Try again!");
      setAlert("flex");
    } else if (password !== password2) {
      // setPwError("visible");
      // setErrMsg("hidden");
      setMessage("The passwords do not match. Try again!");
      setAlert("flex"); 
    } else {
      const res = await fetch("http://localhost:4000/api/register", {
        method: "POST",
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
        console.log("registered successful");
        // setErrMsg("hidden");
        setAlert("none");
        history.push("/userpage");
      } else {
        // setErrMsg("visible");
        setMessage("Registration failed. Check your connection.");
        setAlert("flex");
        console.log("registered failed: ", data.err);
      }
    }
  }

  const fetchcookie = async () => {
    try{
      const res = await fetch("http://localhost:4000/", {
        method: "GET",
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

        {/* <p style={{color: 'red', visibility: errMsg}}>Some fields are missing. Try again!</p> */}
        {/* <p style={{color: 'red', visibility: pwErr}}>The passwords do not match. Try again!</p> */}
        </div>
      </div>
    );
}
  
export default Register;