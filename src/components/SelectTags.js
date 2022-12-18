import React, { useEffect, useState } from "react";
import Close from "../assets/close.svg";
import TagOption from "./TagOption.js";

function SelectTags(props) {

    const handleHobbies = (hobby) => {
        if(props.hobbySelections.has(hobby))
            props.hobbySelections.delete(hobby)
        else
            props.hobbySelections.add(hobby);
    }

    const handleTags = () => {
        if(props.hobbySelections.size === 0) {
            props.setMessage("Selection is required");
            props.setAlert("flex");
        } else {
            props.setAlert("none");
            props.setMessage("");
            props.setTags(Array.from(props.hobbySelections).join(","));
            props.setSwitchDisplay(1);
        }
    }

    return (
        <div className="tags-select" style={{visibility: props.postWindow}}>
            <div className="tags-header"> 
                <h3>Select Tags</h3>
                <img className="close" src={Close} onClick={() => props.closePostWindow()}></img>
            </div>
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
                            <div className="tag-center-button">
                                <a href="/hobbies"><button className="tags-button">Find</button></a>
                            </div>
                        </div>
                    </div>
                }
        </div>
    );

}

export default SelectTags;