import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import UserIcon from "../assets/person-circle.svg";
import FollowButton from "./FollowButton";

function UserSearchResult(props) { 

    const location = useLocation();
    const { pathname } = location;

    const page = pathname.split("/")[2];

    const history = useHistory();
    let userProfile = {
        username: props.username
    }
    let user = {
        username: null
    }

    return (
        <div className="user-search" onClick={() => {history.push(`/profile/${props.username}`)}}>
            <div className="user-search-body">
                <div className="user-search-info">
                    <img src={UserIcon}></img>
                    <div className="user-search-text">
                        <h5>{props.user.first_name} {props.user.last_name}</h5>
                        {/* {console.log("hobbies: " + props.user.hobbies)} */}
                        {props.user.hobbies ? 
                            props.user.hobbies.map((hobby, index) => {
                                if(index === props.user.hobbies.length - 1)
                                    return(<p className="user-hobby-list">{hobby}</p>)
                                else
                                    return(<p className="user-hobby-list">{hobby},</p>);
                            }) : 
                            <div>
                                <p>@{props.username}</p>
                            </div>
                        }
                    </div>
                </div>
                {/* <div className="follow-button" onClick={() => followUser(userProfile.username)}>follow</div> */}
                {/* <button className="follow-button">follow</button> */}
                {/* {console.log("userProfile and user information before sending to follow button")}
                {console.log(props.userProfile)}
                {console.log(props.sessionUser)} */}
                {page != "follow-page" ?
                    <FollowButton user={props.sessionUser} userProfile={userProfile} />
                    :
                    <div></div>
                }
            </div>
        </div>
    );

}

export default UserSearchResult;