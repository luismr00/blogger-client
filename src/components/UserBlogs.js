import React, {useState, useEffect} from 'react'
import { useHistory } from "react-router-dom";


const UserBlogs = () => {
    //const [authenticated, setAuthenticated] = useState(false);
    const history = useHistory();
    const [users, setUsers] = useState([]);
    const [username, setUsername] = useState(null);
    const [userBlogs, setUserBlogs] = useState([]);

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
        console.log("Retrieved positive blogs from selected user")
    }, [userBlogs]);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("submitting positive blogs");
        getUserBlogs();
        
    }

    const getUserBlogs = async () => {
        const res = await fetch("http://localhost:4000/api/user-blogs-positive", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userName: username
            }),
        })
        const data = await res.json();
        if(data.blogs != null){
            console.log(data.blogs);
            setUserBlogs(data.blogs);
        }
    }

    return (
        <>
            <div className="default">
                <form className='positive-blogs' onSubmit={handleSubmit}>
                    <label htmlFor="user-post-blogs">Find positive blogs from a user:</label>
                    <select name="username" id="username" onChange={event => setUsername(event.target.value)}>
                        <option value="null">Select user</option>
                        {users.map((user, key) => ( 
                            <option value={user.username} id={key} key={key}>{user.username}</option>
                        ))}
                    </select>
                    <button type="submit" value="Submit">Submit</button>
                </form>

                {userBlogs.length !== 0 ? 
                    userBlogs.map((blog,i) => {
                        return (
                            <div className="card" style={{width: "18rem", margin: '0 auto', marginBottom: '30px'}} key={i}>
                            <div className="card-body">
                              <h5 className="card-title">Subject: {blog.subject}</h5>
                              <h6 className="card-subtitle mb-2 text-muted">Author: {blog.user_id}</h6>
                              <p className="card-text">Description: {blog.description}</p>
                              <p className="card-text">Tags: {blog.tags}</p>
                              <button onClick={() => {history.push(`/blog/:${blog.id}`, {state: {user_id: blog.user_id, subject: blog.subject, description: blog.description, tags: blog.tags}})}}>Check Comments</button>
                            </div>
                          </div>
                        )
                    })
                    
                : <div>No blogs found</div>
                }
            </div>
        </>
    )
}

export default UserBlogs;