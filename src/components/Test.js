import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateFriends } from '../reducers/reducer';

function Test() {

    const friends = useSelector((state) => state.friends.friends);
    const dispatch = useDispatch();

    const addNewList = () => {
        let newFriends = [...friends];
        newFriends.push("friend");
        dispatch(updateFriends(newFriends));
    }

    return (
        <div>
            <h1>Friends List</h1>
            {friends.length === 0 ?
                <p>No friends found</p>
                :
                friends.map((user) => {
                    return (
                        <p>{user}</p>
                    );
                })
            }
            <div>
                <button onClick={() => addNewList()}>New</button>
            </div>
        </div>
    )
     
}
  
export default Test;