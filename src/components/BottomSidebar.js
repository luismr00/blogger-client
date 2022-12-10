import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import UserIcon from "../assets/person-circle.svg";
import Home from "../assets/home.svg";
import Search from "../assets/search.svg";
import Interests from "../assets/interests.svg";
import Person from "../assets/person.svg";
import Comment from "../assets/comment.svg";

function BottomSidebar(props) {

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
        <div className="bottom-sidebar">
            {/* MAKE BOTTOM BUTTON NAVIGATION FIXED */}
            {/* <div className="navigations comment-icon" onClick={() => props.openPostWindow()}>
                <img className="icon" src={Comment}></img>
            </div> */}
            <div className="bottom-menu">
                {/* <div className="bottom-options"> */}
                    <a href="/userPage">
                        <div className="bottom-navigations">
                            <img className="icon" src={Home}></img>
                            {/* <h2>Home</h2> */}
                        </div>
                    </a>
                    <a href="/search">
                        <div className="bottom-navigations">
                            <img className="icon" src={Search}></img>
                            {/* <h2>Search</h2> */}
                        </div>
                    </a>
                    {/* <span class="material-symbols-outlined">interests</span> */}
                    <a href="/hobbies">
                        <div className="bottom-navigations">
                            <img className="icon" src={Interests}></img>
                            {/* <h2>Hobbies</h2> */}
                        </div>
                    </a>
                    <div className="bottom-navigations" onClick={() => {history.push(`/profile/${props.user.username}`)}}>
                        <img className="icon" src={Person}></img>
                        {/* <div><h2>Profile</h2></div> */}
                    </div>
                    {/* Make the logout button a 100% width fixed button above */}
                    {/* <div className="user-options" style={showLogout ? {visibility: "visible"} : {visibility: "hidden"}}>
                        <div onClick={() => logout()}><p>Log out</p></div>
                    </div> */}
                    {/* <div className="bottom-navigations" onClick={()=>showLogout ? setShowLogout(false) : setShowLogout(true)}>
                        <div className="user-icon">
                            <img src={UserIcon}></img>
                        </div>
                    </div> */}
                    <div className="navigations comment-icon" onClick={() => props.openPostWindow()}>
                        <img className="icon" src={Comment}></img>
                    </div>
                {/* </div> */}
            </div>
        </div>
    );
}

export default BottomSidebar;