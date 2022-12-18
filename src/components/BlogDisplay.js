import React, {useEffect, useState, useRef, useLayoutEffect} from 'react'
import { useHistory } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import ThumbsUp from '../assets/thumbs_up.svg';
import ThumbsDown from '../assets/thumbs_down.svg';
import SelectedThumbsUp from '../assets/selected_thumbs_up.svg';
import SelectedThumbsDown from '../assets/selected_thumbs_down.svg';
import UserIcon from "../assets/person-circle.svg"

const MIN_TEXTAREA_HEIGHT = 32;

const Blog = (props) => {
    const location = useLocation();
    const { pathname } = location;
    const history = useHistory();
    const [showLogout, setShowLogout] = useState(false);
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(1);
    const [commentList, setCommentList] = useState([]);
    const [likes, setLikes] = useState(location.state.props.likes);
    const [dislikes, setDislikes] = useState(location.state.props.dislikes);

    //For textarea adjustment text growth/shrink
    const textareaRef = useRef(null);

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

    useLayoutEffect(() => {
        // Reset height - important to shrink on delete
        textareaRef.current.style.height = "inherit";
        // Set height
        textareaRef.current.style.height = `${Math.max(
            textareaRef.current.scrollHeight,
            MIN_TEXTAREA_HEIGHT
        )}px`;
    }, [comment]);

    const postComment = async (e) => {
        e.preventDefault();

        if(comment === "") {
            props.setMessage("Comment is missing");
            props.setAlert("flex");
        } else {
            const res = await fetch(`https://mysql-blogger.herokuapp.com/api/${pathname.split("/")[2]}/comment`, {
                method: "POST",
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    comment: comment,
                    rating: rating
                }),
            })
            const data = await res.json();
            if(data.success) {
                props.setMessage("Comment posted successfully");
                props.setAlert("flex");
                setTimeout(() => {
                    props.setAlert("none");
                }, 3000);
                let newCommentList = [...commentList];
                const newComment = {
                    comment: comment,
                    username: data.username,
                    rating: rating
                }
                setComment("");
                callComments();
                if(rating === 1)
                    setLikes(likes + 1);
                else
                    setDislikes(dislikes + 1);
            } else {
                props.setMessage(data.err);
                props.setAlert("flex");
            }
        }
        
    }

    const callComments = async () => {
        const res = await fetch(`https://mysql-blogger.herokuapp.com/api/${pathname.split("/")[2]}/comments`, {
            method: "GET",
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            const data = await res.json();
            if(data.success) {
                setCommentList(data.comments);
            } else {
                console.log("comments failed");
            }
    }

    useEffect(() => {
        callComments();
    }, [])
    
  return (


    <div className="column main-display">
        <div className="main-content">
            <div className="main-header">
                <div className="logo-header"><p>B</p></div>
                <h1>Comments</h1>
                <div className="user-icon-header" onClick={()=>showLogout ? setShowLogout(false) : setShowLogout(true)}>
                    <img src={UserIcon}></img>
                </div>
            </div>
                <div className="comment">
                    <div className="comment-body">
                        <h5 className="comment-title">{location.state.props.subject}</h5>
                        <h6 className="comment-subtitle" style={{color: 'red'}}>by {location.state.props.user_id}</h6>
                        <p className="comment-text">{location.state.props.description}</p>
                        <p className="comment-info">Tags: {location.state.props.tags}</p>
                    </div>
                </div>
                <div className='comment-bottom'>
                    <p className="comment-info">{likes} Likes</p>
                    <p className="comment-info">{dislikes} Disikes</p>
                </div>

                <div className='comment-reply'>
                    <textarea
                        onChange={(e)=> {setComment(e.target.value)}}
                        ref={textareaRef}
                        style={{
                            minHeight: MIN_TEXTAREA_HEIGHT,
                            resize: "none",
                            width: "100%",
                        }}
                        placeholder="Reply to user..."
                        value={comment}
                    />
                    <div className='comment-reply-buttons'>
                        <div className='comment-ratings'>
                            <img src={rating === 1 ? SelectedThumbsUp : ThumbsUp} className="rating-icon" onClick={() => setRating(1)}></img>
                            <img src={rating === 0 ? SelectedThumbsDown : ThumbsDown} className="rating-icon" onClick={() => setRating(0)}></img>
                        </div>
                        <button className='comment-button' onClick={postComment}>Comment</button>
                    </div>
                </div>
                <div>
                    {commentList.map((comments,i) => {
                        return (
                            <div className="comment">
                                <div className="comment-body">
                                    <div className='comment-header'>
                                        <h6 className="comment-title">Reply by @{comments.username}</h6>
                                        <img src={comments.rating === 1 ? SelectedThumbsUp : SelectedThumbsDown} className='comment-rating-icon'></img>
                                    </div>
                                    <p className="comment-text">{comments.comment}</p>
                                </div>
                            </div>
                    )})}
                </div>
        </div>
        <div className="user-options" style={showLogout ? {visibility: "visible"} : {visibility: "hidden"}} onClick={() => logout()}>
            <div onClick={() => logout()}><p>Log out</p></div>
        </div>
    </div>


  )
}

export default Blog;