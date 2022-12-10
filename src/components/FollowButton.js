import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateFriends } from '../reducers/reducer';
import { useLocation } from 'react-router-dom';


function FollowButton(props) {

    const location = useLocation();
    const { pathname } = location;
    const dispatch = useDispatch();
    const friends = useSelector((state) => state.friends.friends);
    const [followed, setFollowed] = useState(null);

    const page = pathname.split("/")[2];

    const followUser = async (followedUser) => {
        console.log(props.follower + ' will now follow ' + followedUser);

        //follower MUST NOT follow itself
        if (props.follower != followedUser) {
            const res = await fetch("http://localhost:4000/api/follow", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    followedUser: followedUser
                    // follower: props.follower
                }),
            })
            const data = await res.json();
            if(data.success === true){
                alert("Followed successfully");
                console.log('successfully followed the user');
                followStatus();
                getFriends();
            }
            else{
                alert(data?.err);
            }

        } else {
            alert("You cannot follow yourself");
            console.log('following oneself is not permitted');
        }
    }

    const unfollowUser = async () => {
        const res = await fetch("http://localhost:4000/api/unfollow", {
            method: "POST",
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
            console.log("Unfollowed successfully");
            setFollowed(null);
            getFriends();
        }
        else{
            alert(data?.err);
        }
    }

    const followStatus = async () => {
        const res = await fetch("http://localhost:4000/api/followed", {
            method: "POST",
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
            console.log("Fetched following id for follow button requirements");
            console.log(data.follower_id)
            setFollowed(data.follower_id);
        }
        else{
            alert(data?.err);
        }
    }

    const getFriends = async (username) => {
        // e.preventDefault();
        const res = await fetch(`http://localhost:4000/api/friends`, {
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
            // console.log("Updating friends list...");
            // ONLY update if the new fetched list has a different length
            if(friends.length != data.friends.length) {
                console.log("Updating friends list...")
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