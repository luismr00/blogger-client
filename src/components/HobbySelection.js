import React, { useEffect, useState } from "react";
import Close from "../assets/close.svg";

// CHANGE THE NAME OF THE CLASSNAMES RELATED TO HOBBY BUT TARGET ALONG WITH SEARCH CLASSNAMES OVER CSS FILE
function HobbySelection(props) {

    const changeView = (view) => {

        if(view === "main") {
            props.setView("main");
        } else { 
            props.setView("manage");
        }

        props.closeSelection();
    }

    return (
        <div className="search-select" style={{visibility: props.hobbySelection}}>
            {/* <img className="close" src={Close} onClick={() => props.showPostWindow("hidden")}></img> */}
            <div className="header-selection">
                {/* <img className="close" src={Close} onClick={() => props.setBlogSelection("hidden")}></img> */}
                <h3>Select option</h3>
                <img className="close" src={Close} onClick={() => props.closeSelection()}></img>
            </div>
            <div className="search-selection-body">
                <div className="search-option" onClick={() => props.setSearchPage(1)}>
                    <p>Add hobby</p>
                </div>
                <div className="search-option" onClick={() => changeView("manage")}>
                    <p>Manage your hobbies</p>
                </div>
                <div className="search-option" onClick={() => changeView("main")}>
                    <p>Select from all hobbies</p>
                </div>
                {/* <div className="search-option" onClick={() => props.setSearchPage(2)}>
                    <p>Search mutual followers from following users</p>
                </div> */}
                {/* <div className="center-button">
                <button className="continue-button">Continue</button>
                </div> */}
            </div>
        </div>
    );

}

export default HobbySelection;