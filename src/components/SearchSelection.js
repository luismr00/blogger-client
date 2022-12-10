import React, { useEffect, useState } from "react";
import Close from "../assets/close.svg";

function SearchSelection(props) {
    return (
        <div className="search-select" style={{visibility: props.searchSelection}}>
            {/* <img className="close" src={Close} onClick={() => props.showPostWindow("hidden")}></img> */}
            <div className="header-selection">
                {/* <img className="close" src={Close} onClick={() => props.setBlogSelection("hidden")}></img> */}
                <h3>Select option</h3>
                <img className="close" src={Close} onClick={() => props.closeSelection()}></img>
            </div>
            <div className="search-selection-body">
                <div className="search-option" onClick={() => props.setSearchPage(1)}>
                    <p>Search user</p>
                </div>
                <div className="search-option" onClick={() => props.handleUserSelection("mutual-hobbies")}>
                    <p>Search users with mutual hobbies</p>
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

export default SearchSelection;