import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from 'react-router-dom';
import Blogs from "./Blogs";
import UserIcon from "../assets/person-circle.svg";
import NotFound from "./NotFound";
import NotAvailable from "./NotAvailable";
import FollowButton from "./FollowButton";

function ProfileDisplay(props) { 

    const location = useLocation();
    const history = useHistory();
    const [showLogout, setShowLogout] = useState(false);
    const { pathname } = location;
    const [userProfile, setUserProfile] = useState(null);
    const [userHobbies, setUserHobbies] = useState(null);
    const [followingUsers, setFollowingUsers] = useState(0);
    const [userFollowers, setUserFollowers] = useState(0);
    const [blogCount, setBlogCount] = useState(0);

    const logout = async () => {
        const res = await fetch("https://mysql-blogger.herokuapp.com/logout", {
          method: "GET",
          credentials: 'include',
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

    const getFollowings = async (username) => {
        const res = await fetch(`https://mysql-blogger.herokuapp.com/api/${pathname.split("/")[2]}/followings`, {
            method: "GET",
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        const data = await res.json();
        if(data.success) {
            setFollowingUsers(data.followings.length);
        } else {
            alert(data?.err);
        }
    }

    const getFollowers = async (username) => {
        const res = await fetch(`https://mysql-blogger.herokuapp.com/api/${pathname.split("/")[2]}/followers`, {
            method: "GET",
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        const data = await res.json();
        if(data.success) {
            setUserFollowers(data.followers.length);
        } else {
            alert(data?.err);
        }
    }

    const getUser = async (e) => {
        const res = await fetch(`https://mysql-blogger.herokuapp.com/api/profile/${pathname.split("/")[2]}`, {
            method: "GET",
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        const data = await res.json();
        if(data.success) {
            setUserProfile(data.profileInfo[0]);
            setUserHobbies(data.hobbies);
            setBlogCount(data.blogs_count[0].blogs_count);
        } else {
            alert(data?.err);
        }
    }

    useEffect(() => {
        getUser();
        getFollowings();
        getFollowers();
    }, [pathname.split("/")[2]]);

    return (
        (userProfile && userHobbies) ? 
            <div className="column main-display">
                <div className="main-content">
                    <div className="main-header">
                        <div className="logo-header"><p>B</p></div>
                        <h1>{userProfile.first_name} {userProfile.last_name}</h1>
                        <div className="user-icon-header" onClick={()=>showLogout ? setShowLogout(false) : setShowLogout(true)}>
                            <img src={UserIcon}></img>
                        </div>
                    </div>
                    <div className="profile-header">
                        <div className="profile-header-body">
                            <div className="profile-header-image">
                                <img src={UserIcon}></img>
                            </div>
                            <div className="profile-header-text">
                                <div className="profile-header-top">
                                    <h4>{userProfile.first_name} {userProfile.last_name}</h4>
                                    <FollowButton user={props.user} userProfile={userProfile} />
                                </div>
                                <div className="hobby-list">
                                    <p>Hobbies:</p>
                                    {userHobbies.length != 0 ? 
                                        userHobbies.map((e, i)=> {
                                            if(i === userHobbies.length - 1) {
                                                return (
                                                    <p>{e.hobby}</p>
                                                );
                                            } else {
                                                return (
                                                    <p>{e.hobby}, </p>
                                                );
                                            }
                                        }) :
                                        <p>None</p>
                                    }
                                </div>
                                <div className="profile-header-follows">
                                    <p>{blogCount} Blogs</p>
                                    <div className="follow-count-select" onClick={() => {history.push(`/${userProfile.username}/follow-page`, {view: "followers", userProfile: userProfile, user: props.user })}}>
                                        <p>{userFollowers} Followers</p>
                                    </div>
                                    <div className="follow-count-select" onClick={() => {history.push(`/${userProfile.username}/follow-page`, {view: "followings", userProfile: userProfile, user: props.user })}}>
                                        <p>{followingUsers} Following</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>  
                    {props.BlogList.length != 0 ?
                        <Blogs BlogList={props.BlogList} BlogLimit={props.BlogLimit} setBlogLimit={props.setBlogLimit}/> 
                        :
                        <NotAvailable title={"It's quiet..."} message={"How about posting your first blog instead?"} button={"none"} margin={"130px 100px 0"} />
                    } 
                </div>
                <div className="user-options" style={showLogout ? {visibility: "visible"} : {visibility: "hidden"}} onClick={() => logout()}>
                    <div><p>Log out</p></div>
                </div>
            </div>
        :
        <NotFound title={"User not found"} message={"Try searching instead"} button={"Search"} margin={"355px 0 0 0"} />
    );

}

export default ProfileDisplay;