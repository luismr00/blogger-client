import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateFriends } from '../reducers/reducer';
import { useLocation } from 'react-router-dom';


function FollowButton(props) {

    const location = useLocation();
    const { pathname } = location;
    const friends = useSelector((state) => state.friends.friends);
    const [followed, setFollowed] = useState(null);
    const dispatch = useDispatch();

    const page = pathname.split("/")[2];

    const followUser = async (followedUser) => {

        //follower MUST NOT follow itself
        if (props.follower != followedUser) {
            const res = await fetch("https://mysql-blogger.herokuapp.com/api/follow", {
                method: "POST",
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    followedUser: followedUser
                }),
            })
            const data = await res.json();
            if(data.success === true){
                alert("Followed successfully");
                followStatus();
                getFriends();
            }
            else{
                alert(data?.err);
            }

        } else {
            alert("You cannot follow yourself");
        }
    }

    const unfollowUser = async () => {
        const res = await fetch("https://mysql-blogger.herokuapp.com/api/unfollow", {
            method: "POST",
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                follow_id: followed
            }),
        })
        const data = await res.json();
        if(data.success === true){
            alert("Unfollowed successfully");
            setFollowed(null);
            getFriends();
        }
        else{
            alert(data?.err);
        }
    }

    const followStatus = async () => {
        const res = await fetch("https://mysql-blogger.herokuapp.com/api/followed", {
            method: "POST",
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                followed: props.userProfile.username
            }),
        })
        const data = await res.json();
        if(data.success === true){
            setFollowed(data.follower_id);
        }
        else{
            alert(data?.err);
        }
    }

    const getFriends = async (username) => {
        // e.preventDefault();
        const res = await fetch(`https://mysql-blogger.herokuapp.com/api/friends`, {
            method: "GET",
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        const data = await res.json();
        if(data.success) {
            if(friends.length != data.friends.length) {
                dispatch(updateFriends(data.friends));
            } else {
                console.log("No friends update");
            }
        } else {
            alert(data?.err);
            console.log(data.err);
        }
    }

    useEffect(() => {
        followStatus();
    }, [props.userProfile]);

    const handleFollow = (event, action) => {
        event.preventDefault();
        event.stopPropagation();
        
        if(action === "follow") {
            followUser(props.userProfile.username)
        } else {
            unfollowUser(props.userProfile.username)
        }
    }

    return (
        followed != null ? 
            <button 
                className="unfollow-button" 
                style={props.userProfile.username === props.user.username ? {display: "none"} : {display: "block"}} 
                onClick={(event) => handleFollow(event, "unfollow")}>
                    Unfollow
            </button>
        :
            <button 
                className="follow-button" 
                style={props.userProfile.username === props.user.username ? {display: "none"} : {visibility: "block"}} 
                onClick={(event) => handleFollow(event, "follow")}>
                    Follow
            </button>
    );
}

export default FollowButton;