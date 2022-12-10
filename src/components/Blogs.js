import React, {useState, useEffect} from 'react'
import { useHistory } from "react-router-dom";
// import PostiveBlogs from './UserBlogs';


const Blogs = (props) => {
    const [authenticated, setAuthenticated] = useState(false);
    const history = useHistory();
    // const [BlogLimit,setBlogLimit] = useState(props.BlogList.slice(0, 10));
    const [follower, setFollower] = useState(null);

    let tags = 0;

    // const fetchpost = async () => {
    //     const res = await fetch("http://localhost:4000/api/blogs", {
    //         method: "GET",
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json',
    //         },
    //     })
    //     const data = await res.json();
    //     if(data.blogs != null){
    //         console.log(data.blogs);
    //         setBlogList(data.blogs);
    //     }
    // }

    // useEffect(() => {
    //     fetchpost();
    // }, []);
    
    useEffect(() => {
        const fetchcookie = async () => {
            const res = await fetch("http://localhost:4000/", {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            })
            const data = await res.json();
            if(data.user != null){
                setFollower(data.user.username);
                setAuthenticated(true);
            } else {
                console.log("user is not logged in");
                setAuthenticated(false);
                history.push("/");
            }
        }
        if(!authenticated){
            fetchcookie();
        }
    }, [authenticated]);

    const followUser = async (followedUser) => {
        console.log(follower + ' will now follow ' + followedUser);

        //follower MUST NOT follow itself
        if (follower != followedUser) {
            const res = await fetch("http://localhost:4000/api/follow", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    followedUser: followedUser,
                    follower: follower
                }),
            })
            const data = await res.json();
            if(data.success === true){
                alert("Followed successfully");
                console.log('successfully followed the user');
            }
            else{
                alert(data?.err);
            }

        } else {
            alert("You cannot follow yourself");
            console.log('following oneself is not permitted');
        }

    }

    const tagCount = (blogTags) => {
        tags = blogTags.split(",").length;
        console.log("fetching tag count");
        console.log(tags);
        // if(tags.includes(","))
        //     console.log(true);
        // else 
        //     console.log(false);
            
    }

    const sliceBlogs = () => {
        let limit = props.BlogLimit.length - 1;
        let list = props.BlogList.slice(0, limit + 10);
        props.setBlogLimit(list);
    }

    return (
        <div className='blog-list'>
            <div className='blogs-container'>
                {/* {console.log(props.BlogList)} */}
                {
                // props.BlogList ? 
                    props.BlogLimit.map((blog,i) => {
                        tagCount(blog.tags);
                        return (
                            <div className="blog" key={i}>
                            {/* <button onClick={() => followUser(blog.user_id)}>Follow</button> */}
                                <div className="blog-body">
                                    <h5 className="blog-title" style={{fontWeight: 'bold'}}>{blog.subject}</h5>
                                    <h6 className="blog-subtitle" style={{color: 'red'}} onClick={() => {history.push(`/profile/${blog.user_id}`)}}>by {blog.user_id}</h6>
                                    <p className="blog-text">{blog.description}</p>
                                    <div className='blog-bottom'>
                                        <p className="blog-text blog-id" onClick={() => {history.push(`/blog/:${blog.id}`, {props: {user_id: blog.user_id, subject: blog.subject, description: blog.description, tags: blog.tags, likes: blog.pos_rating, dislikes: blog.neg_rating }})}}>{blog.comment_count} Comments</p>
                                        <p className="blog-text">{blog.pos_rating} Likes</p>
                                        <p className="blog-text">{blog.neg_rating} Disikes</p>
                                        <p className="blog-text">Tags: {tags}</p>
                                        {/* <button onClick={() => {history.push(`/blog/:${blog.id}`, {state: {user_id: blog.user_id, subject: blog.subject, description: blog.description, tags: blog.tags}})}}>Comments</button> */}
                                    </div>
                                </div>
                            </div>
                        )
                    }) 
                    // :
                    // <div></div>
                }
            </div>
                {props.BlogLimit.length === props.BlogList.length ?
                    // <div className='load-blogs' style={{color: "black", fontWeight: "bold"}}>
                    //     <p>You've reached the end</p>
                    // </div>
                    <div></div>
                    :
                    <div className='load-blogs'>
                        <p className='load-blogs-text' onClick={() => sliceBlogs()}>More blogs</p>
                    </div>
                }
                <div className="extra-space-mobile"></div>
        </div>
    )
}

export default Blogs