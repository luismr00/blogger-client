import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import UserIcon from "../assets/person-circle.svg";
import Home from "../assets/home.svg";
import Search from "../assets/search.svg";
import Interests from "../assets/interests.svg";
import Person from "../assets/person.svg";
import Comment from "../assets/comment.svg";


function Sidebar(props) { 

    const history = useHistory();
    const [showLogout, setShowLogout] = useState(false);

    const logout = async () => {
        const res = await fetch("http://localhost:4000/logout", {
          method: "GET",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        })
        const data = await res.json();
        if(data.success) {
          console.log("logout successful");
          props.setAuthenticated(false);
          props.setUser(null);
          history.push("/");
        } else {
          console.log("logout failed");
        }
    }

    return (
        <div className="column" id="sidebar">
            <div className="main-menu">
                <div className="main-options">
                    <h1 className="logo-name">Blogger</h1>
                    <div className="logo" id="hide-logo"><p>B</p></div>
                    <a href="/userPage">
                        <div className="navigations">
                            <img className="icon" src={Home}></img>
                            <h2>Home</h2>
                        </div>
                    </a>
                    <a href="/search">
                        <div className="navigations">
                            <img className="icon" src={Search}></img>
                            <h2>Search</h2>
                        </div>
                    </a>
                    {/* <span class="material-symbols-outlined">interests</span> */}
                    <a href="/hobbies">
                        <div className="navigations">
                            <img className="icon" src={Interests}></img>
                            <h2>Hobbies</h2>
                        </div>
                    </a>
                    <div className="navigations" onClick={() => {history.push(`/profile/${props.user.username}`)}}>
                        <img className="icon" src={Person}></img>
                        <div><h2>Profile</h2></div>
                    </div>
                    <div className="navigations comment-icon" onClick={() => props.openPostWindow()}>
                        <img className="icon" src={Comment}></img>
                    </div>
                    <button className="post-button" onClick={() => props.openPostWindow()}><p>Post</p></button>
                </div>
                <div className="user-options" style={showLogout ? {visibility: "visible"} : {visibility: "hidden"}}>
                    <div onClick={() => logout()}><p>Log out</p></div>
                </div>
                <div className="user-button" onClick={()=>showLogout ? setShowLogout(false) : setShowLogout(true)}>
                    <div className="user-icon">
                        <img src={UserIcon}></img>
                    </div>
                    <p className="user-button-name">{props.user.firstName} {props.user.lastName}</p>
                </div>
            </div>

            {/* image next to user's name */}
            {/* <span class="material-symbols-outlined">account_circle</span> */}
            {/* <i class="bi bi-person-circle"></i> */}
        </div>
    );

}

export default Sidebar;