import React from "react";
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
                        {/* <h5>{props.user.first_name} {props.user.last_name}</h5> */}
                        <div className="user-search-text-header">
                            <h5>{props.user.first_name} {props.user.last_name}</h5>
                            {page != "follow-page" ?
                                <FollowButton user={props.sessionUser} userProfile={userProfile} />
                                :
                                <div></div>
                            }
                        </div>
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
                {/* {page != "follow-page" ?
                    <FollowButton user={props.sessionUser} userProfile={userProfile} />
                    :
                    <div></div>
                } */}
            </div>
        </div>
    );

}

export default UserSearchResult;