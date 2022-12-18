import React, { useEffect, useState } from "react";
import Close from "../assets/close.svg";

function Post(props) {

  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if(subject.length === 0 || props.tags.length === 0 || description.length === 0) {
      props.setMessage("All fields required");
      props.setAlert("flex");
    } else {
      props.setAlert("none");
      props.setMessage("");
      post(event);
      props.closePostWindow();
      props.fetchpost();
      
    }
  }

  const post = async (e) => {
    e.preventDefault();
    const res = await fetch("https://mysql-blogger.herokuapp.com/api/create", {
        method: "POST",
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
      },
      body: JSON.stringify({
              description: description,
              subject: subject,
              tags: props.tags,
      }),
      }) 
      const data = await res.json();
      if(data.success) {
          props.setMessage("Blog created successfully")
          props.setAlert("flex");
          setTimeout(() => {
            props.setAlert("none");
          }, 3000);
          setDescription("");
          setSubject("");
          props.setTags("");
          props.fetchpost();
      } else {
          alert(data?.err);
          console.log("create failed");
      }
  }

    return (
        <div className="post" style={{visibility: props.postWindow}}>
          <div className="post-body">
          <div className="post-header">
            <label>{props.user.username}</label>
            <img className="close" src={Close} onClick={() => props.closePostWindow()}></img>
          </div>
          <div className="form-body">
            <form onSubmit={handleSubmit}>
              <input className="post-subject" placeholder="Subject" value={subject} onChange={(event) => setSubject(event.target.value)}></input>
              <textarea className="post-text" placeholder="Description" value={description} onChange={(event) => setDescription(event.target.value)}></textarea>
              <div className="submit-post">
                <button className="submit-button" onClick={() => props.setSwitchDisplay(0)}>Back</button>
                <button type="submit" className="submit-button">Submit</button>
              </div>
            </form>
          </div>
          </div>
        </div>
    );

}

export default Post;