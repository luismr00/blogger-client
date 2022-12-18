import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Home from "../assets/home.svg";
import Search from "../assets/search.svg";
import Interests from "../assets/interests.svg";
import Person from "../assets/person.svg";
import Comment from "../assets/comment.svg";

function BottomSidebar(props) {

    const history = useHistory();

    return (
        <div className="bottom-sidebar">
            <div className="bottom-menu">
                    <a href="/userPage">
                        <div className="bottom-navigations">
                            <img className="icon" src={Home}></img>
                        </div>
                    </a>
                    <a href="/search">
                        <div className="bottom-navigations">
                            <img className="icon" src={Search}></img>
                        </div>
                    </a>
                    <a href="/hobbies">
                        <div className="bottom-navigations">
                            <img className="icon" src={Interests}></img>
                        </div>
                    </a>
                    <div className="bottom-navigations" onClick={() => {history.push(`/profile/${props.user.username}`)}}>
                        <img className="icon" src={Person}></img>
                    </div>
                    <div className="navigations comment-icon" onClick={() => props.openPostWindow()}>
                        <img className="icon" src={Comment}></img>
                    </div>
            </div>
        </div>
    );
}

export default BottomSidebar;