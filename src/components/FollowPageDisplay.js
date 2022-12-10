import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import Blogs from "./Blogs";
import UserIcon from "../assets/person-circle.svg";
import NotFound from "./NotFound";
import UserSearchResult from "./UserSearchResult";

function ProfileDisplay(props) {

    // const [follower, setFollower] = useState(null);
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
    const [selection, setSelection] = useState(props.view ? props.view : "followers"); //use props.view ? props.view : followers

    // console.log('CHECKING VIEW');
    // console.log(location.props.view);

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

    const getFollowings = async (username) => {
        // e.preventDefault();
        const res = await fetch(`http://localhost:4000/api/${pathname.split("/")[1]}/followings`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
            // , body: JSON.stringify({
            //     follower: username
            // }),
        })
        const data = await res.json();
        if(data.success) {
            console.log("Getting information over the console followings...");
            console.log(data.followings);
            setFollowingUsers(data.followings);

            if(props.view === "followings")
                setUsers(data.followings);
            // setUserProfile(data.profileInfo[0]);
            // setUserHobbies(data.hobbies);
        } else {
            alert(data?.err);
            console.log(data.err);
        }
    }

    const getFollowers = async (username) => {
        // e.preventDefault();
        const res = await fetch(`http://localhost:4000/api/${pathname.split("/")[1]}/followers`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
            // , body: JSON.stringify({
            //     follower: username
            // }),
        })
        const data = await res.json();
        if(data.success) {
            console.log("Getting information over the console for followers...");
            console.log(data.followers);
            setUserFollowers(data.followers);

            if(props.view === "followers" || selection === "followers")
                setUsers(data.followers);
            // setUserProfile(data.profileInfo[0]);
            // setUserHobbies(data.hobbies);
        } else {
            alert(data?.err);
            console.log(data.err);
        }
    }

    const getUser = async (e) => {
        // e.preventDefault();
        const res = await fetch(`http://localhost:4000/api/profile/${pathname.split("/")[1]}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        const data = await res.json();
        if(data.success) {
            // console.log("Getting information from getUser...");
            // console.log(data.profileInfo);
            // console.log(data.hobbies);
            // console.log(data.blogs_count[0].blogs_count);
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

        console.log(users);
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
                    {/* <div>FOLLOW RESULTS HERE THROUGH MAPPING</div> */}
                    <br></br>
                    {users != null ? 
                        users.map((user, index) => {
                        {console.log(user)}
                            return(
                                <UserSearchResult user={user} username={user.username} userProfile={userProfile} index={index} />
                                // <p>result</p>
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
        // <NotFound />
        <NotFound title={"User not found"} message={"Try searching instead"} button={"Search"} margin={"355px 0 0 0"} />

    );

}

export default ProfileDisplay;