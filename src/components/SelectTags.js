import React, { useEffect, useState } from "react";
import Close from "../assets/close.svg";
import TagOption from "./TagOption.js";

function SelectTags(props) {

//   const [subject, setSubject] = useState('');
//   const [tags, setTags] = useState('');
//   const [description, setDescription] = useState('');
//   const [selected, setSelected] = useState(false);
// let hobbySelections = new Set();
    // const [tagDisplay, setTagDisplay] = useState(true);

    // const handleTagDisplay = () => {
    //     if(props.hobbySelections.length === 0) 
    //         setTagDisplay(false) 
    //     else 
    //         true
    // }

    const handleHobbies = (hobby) => {
        console.log("Handle hobby: " + hobby);

        //userHobbies to set
        if(props.hobbySelections.has(hobby))
            props.hobbySelections.delete(hobby)
        else
            props.hobbySelections.add(hobby);

        console.log(props.hobbySelections);

    }

    const handleTags = () => {

        if(props.hobbySelections.size === 0) {
            // console.log("Selection is required before moving forward/disable button");
            props.setMessage("Selection is required");
            props.setAlert("flex");
        } else {
            console.log("Saving as tags: " + Array.from(props.hobbySelections).join(","));
            props.setAlert("none");
            props.setMessage("");
            props.setTags(Array.from(props.hobbySelections).join(","));
            props.setSwitchDisplay(1);
        }
    }

    // console.log("initial postWindow value: " + props.postWindow);
    return (
        <div className="tags-select" style={{visibility: props.postWindow}}>
            <div className="tags-header"> 
                <h3>Select Tags</h3>
                <img className="close" src={Close} onClick={() => props.closePostWindow()}></img>
            </div>
          {/* <div className="post-body"> */}
          {/* <div className="post-header">
            <label>luismi</label>
            <img className="close" src={Close} onClick={() => props.showPostWindow("hidden")}></img>
          </div> */}
          {/* change classname below */}
            
                {/* <p style={tagDisplay ? {margin: "15px 20px 0", fontWeight: "bold", visibility: "visible"} : {visibility: "hidden", display: "none"}}>Select among your hobbies to tag your blog. This is required.</p> */}
                {/* <p style={{margin: "0 20px", fontWeight: "bold"}}>This is required.</p> */}
                {/* <div className="hobby-tags"> */}
                {props.tagDisplay ? 
                        <div className="tags-selection-body">
                            <div className="hobby-tags">
                                <p style={{margin: "15px 0 15px 8px", fontWeight: "bold"}}>Select among your hobbies to tag your blog. This is required.</p>
                                {props.userHobbies.map((hobby, key) => {
                                    return (
                                        <TagOption hobby={hobby} key={key} handleHobbies={handleHobbies}/>
                                    );
                                })} 
                            </div>
                            <div className="tag-center-button">
                                <button className="tags-button" onClick={() => handleTags()}>Next</button>
                            </div>
                        </div>
                        :
                    <div className="tags-selection-body">
                        <div className="tag-error">
                            <h3 style={{margin: "0 0 5px"}}>Uh-oh</h3>
                            <p>You have no hobbies to select. Find a hobby to you want to tag your post with first before proceeding.</p>
                            {/* <p>Find a hobby to you want to tag your post with first before proceeding.</p> */}
                            <div className="tag-center-button">
                                <a href="/hobbies"><button className="tags-button">Find</button></a>
                            </div>
                        </div>
                    </div>
                }
                    
                    {/* {tagDisplay ? 
                        props.userHobbies.map((hobby, key) => {
                            return (
                                // <div 
                                //     className="tag-selection" 
                                //     key={key}
                                //     onClick={() => handleSelection()}
                                //     style={hobbyColors}
                                // >
                                //         <p>{hobby}</p>
                                // </div>
                                <TagOption hobby={hobby} key={key} handleHobbies={handleHobbies}/>
                            );
                        }) :
                            <div>You have no hobbies to select.</div>
                    } */}

                {/* </div> */}
                {/* <div className="tag-center-button">
                    <button className="tags-button" onClick={() => handleTags()}>Next</button>
                </div> */}
            {/* </div> */}
          
          {/* </div> */}
        </div>
    );

}

export default SelectTags;