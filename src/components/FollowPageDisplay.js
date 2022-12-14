import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import Blogs from "./Blogs";
import UserIcon from "../assets/person-circle.svg";
import NotFound from "./NotFound";
import UserSearchResult from "./UserSearchResult";

function ProfileDisplay(props) {

    const location = useLocation();
    const { pathname } = location;
    const history = useHistory();
    const [showLogout, setShowLogout] = useState(false);
    const [users, setUsers] = useState(null);
    const [userProfile, setUserProfile] = useState(null);
    const [userHobbies, setUserHobbies] = useState(null);
    const [followingUsers, setFollowingUsers] = useState(0);
    const [userFollowers, setUserFollowers] = useState(0);
    const [blogCount, setBlogCount] = useState(0);
    const [selection, setSelection] = useState(props.view ? props.view : "followers");

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
        const res = await fetch(`https://mysql-blogger.herokuapp.com/api/${pathname.split("/")[1]}/followings`, {
            method: "GET",
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        const data = await res.json();
        if(data.success) {
            setFollowingUsers(data.followings);

            if(props.view === "followings")
                setUsers(data.followings);
        } else {
            alert(data?.err);
            console.log(data.err);
        }
    }

    const getFollowers = async (username) => {
        const res = await fetch(`https://mysql-blogger.herokuapp.com/api/${pathname.split("/")[1]}/followers`, {
            method: "GET",
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        const data = await res.json();
        if(data.success) {
            setUserFollowers(data.followers);

            if(props.view === "followers" || selection === "followers")
                setUsers(data.followers);
        } else {
            alert(data?.err);
            console.log(data.err);
        }
    }

    const getUser = async (e) => {
        const res = await fetch(`https://mysql-blogger.herokuapp.com/api/profile/${pathname.split("/")[1]}`, {
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
            console.log(data.err);
        }
    }

    useEffect(() => {
        getUser();
        getFollowers();
        getFollowings();
    }, []);

    const handleTabs = (tab) => {
        if(tab === "followers") {
            setSelection("followers");
            setUsers(userFollowers);
        } else {
            setSelection("followings");
            setUsers(followingUsers);
        }
    }

    const selectionColors =  {
        backgroundColor: "#D4D4D4"
    }

    const defaultColor = {
        backgroundColor: "white"
    }

    return (
        (userProfile) ? 
            <div className="column main-display">
                <div className="main-content">
                    <div className="main-header">
                        <div className="logo-header"><p>B</p></div>
                        <h1>{userProfile.first_name} {userProfile.last_name}</h1>
                        <div className="user-icon-header" onClick={()=>showLogout ? setShowLogout(false) : setShowLogout(true)}>
                            <img src={UserIcon}></img>
                        </div>
                    </div>
                    <div className="follow-tabs">
                        <div className="tab" style={selection === "followers" ? selectionColors : defaultColor} onClick={() => handleTabs("followers")}><p>Followers</p></div>
                        <div className="tab" style={selection === "followings" ? selectionColors : defaultColor} onClick={() => handleTabs("followings")}><p>Following</p></div>
                    </div>
                    <br></br>
                    {users != null ? 
                        users.map((user, index) => {
                            return(
                                <UserSearchResult user={user} username={user.username} userProfile={userProfile} index={index} />
                            );
                        }) : 
                        <div></div>
                    }
                </div>
                <div className="user-options" style={showLogout ? {visibility: "visible"} : {visibility: "hidden"}} onClick={() => logout()}>
                    <div onClick={() => logout()}><p>Log out</p></div>
                </div>
            </div>
        :
        <NotFound title={"User not found"} message={"Try searching instead"} button={"Search"} margin={"355px 0 0 0"} />

    );

}

export default ProfileDisplay;