import React, {useState, useEffect} from 'react'
import { useHistory } from "react-router-dom";


const MutualFollowers = () => {
    //const [authenticated, setAuthenticated] = useState(false);
    const history = useHistory();
    const [users, setUsers] = useState([]);
    const [user1, setuser1] = useState(null);
    const [user2, setuser2] = useState(null);
    const [followers, setFollowers] = useState([]);

    useEffect(() => {
        const fetchusers = async () => {
            const res = await fetch("http://localhost:4000/api/users", {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            })
            const data = await res.json();
            if(data.users != null){
                console.log(data.users);
                setUsers(data.users);
            }
        }
        fetchusers();

    }, []);
    
    useEffect(() => {
        //console.log('Selected username changed to: ' + username);
        console.log("fetched mutual followers");
        console.log(followers);
    }, [followers]);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("fetching mutual followers");
        getMutualFollowers();
    }

    const getMutualFollowers = async () => {
        if ((user1 && user2) != null ) {
            const res = await fetch("http://localhost:4000/api/mutualFollowers", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user1: user1,
                    user2: user2
                }),
            })
            const data = await res.json();
            if(data.followers != null){
                console.log(data.followers);
                setFollowers(data.followers);
            }
        } else {
            alert("Please select two users");
            console.log("must select two users");
        }
    }

    return (
        <>
            <div className="default">
                <form className='positive-blogs' onSubmit={handleSubmit}>
                    <label htmlFor="user-post-blogs">Find mutual followers between two users:</label>
                    <select name="user1" id="user1" onChange={event => setuser1(event.target.value)}>
                        <option value="null">Select user</option>
                        {users.map((user, key) => ( 
                            <option value={user.username} id={key} key={key}>{user.username}</option>
                        ))}
                    </select>
                    <select name="user2" id="user2" onChange={event => setuser2(event.target.value)}>
                        <option value="null">Select user</option>
                        {users.map((user, key) => ( 
                            <option value={user.username} id={key} key={key}>{user.username}</option>
                        ))}
                    </select>
                    <button type="submit" value="Submit">Submit</button>
                </form>

                <p><b>Mutual Followers</b></p>

                {followers.length != 0 ? 
                    followers.map((follower,i) => {
                        return (
                            <p key={i}>{follower.follower_id}</p>
                        )
                    })
                    
                : <div>No mutual followers found</div>
                }

            </div>
        </>
    )
}

export default MutualFollowers;