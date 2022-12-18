import React, {useState, useEffect} from 'react'
import { useHistory } from "react-router-dom";

const Blogs = (props) => {
    const [authenticated, setAuthenticated] = useState(false);
    const history = useHistory();
    const [follower, setFollower] = useState(null);

    let tags = 0;
    
    useEffect(() => {
        const fetchcookie = async () => {
            const res = await fetch("https://mysql-blogger.herokuapp.com/", {
                method: "GET",
                credentials: 'include',
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

    const tagCount = (blogTags) => {
        tags = blogTags.split(",").length;
    }

    const sliceBlogs = () => {
        let limit = props.BlogLimit.length - 1;
        let list = props.BlogList.slice(0, limit + 10);
        props.setBlogLimit(list);
    }

    return (
        <div className='blog-list'>
            <div className='blogs-container'>
                {
                    props.BlogLimit.map((blog,i) => {
                        tagCount(blog.tags);
                        return (
                            <div className="blog" key={i}>
                                <div className="blog-body">
                                    <h5 className="blog-title" style={{fontWeight: 'bold'}}>{blog.subject}</h5>
                                    <h6 className="blog-subtitle" style={{color: 'red'}} onClick={() => {history.push(`/profile/${blog.user_id}`)}}>by {blog.user_id}</h6>
                                    <p className="blog-text">{blog.description}</p>
                                    <div className='blog-bottom'>
                                        <p className="blog-text blog-id" onClick={() => {history.push(`/blog/:${blog.id}`, {props: {user_id: blog.user_id, subject: blog.subject, description: blog.description, tags: blog.tags, likes: blog.pos_rating, dislikes: blog.neg_rating }})}}>{blog.comment_count} Comments</p>
                                        <p className="blog-text">{blog.pos_rating} Likes</p>
                                        <p className="blog-text">{blog.neg_rating} Disikes</p>
                                        <p className="blog-text">Tags: {tags}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    }) 
                }
            </div>
                {props.BlogLimit.length === props.BlogList.length ?
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