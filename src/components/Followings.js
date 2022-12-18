import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom"
import UserIcon from "../assets/person-circle.svg";
import { useSelector, useDispatch } from "react-redux";
import { updateFriends } from '../reducers/reducer';

function Followings(props) { 

    const friends = useSelector((state) => state.friends.friends);
    const history = useHistory();
    const dispatch = useDispatch(); 

    const getFriends = async (username) => {
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
            dispatch(updateFriends(data.friends));
        } else {
            alert(data?.err);
        }
    }

    useEffect(() => {
        getFriends();
    }, []);

    return (
        <div className="column" id="col-follow">
            <div className="following">
                <div className="following-header">
                    <h1>Friends</h1>
                </div>
                <div className="user-container">
                {friends.length === 0 ? 
                    <div></div>
                    :
                    friends.map((friend) => {
                        return(
                            <div className="user-bar" onClick={() => {history.push(`/profile/${friend.username}`)}}>
                                <img src={UserIcon}></img>
                                <p style={{fontSize: '20px', margin: '8px 0 0 15px'}}>{friend.first_name} {friend.last_name}</p>
                            </div>
                        );
                    })
                }
                </div>
            </div>
        </div>
    );

}

export default Followings;