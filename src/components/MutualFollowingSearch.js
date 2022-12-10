import React, { useEffect, useState } from "react";
import Close from "../assets/close.svg";

function MutualFollowingSearch(props) {
    return (
        <div className="search-select" style={{visibility: props.searchSelection}}>
            <div className="header-selection">
                <h3>Search</h3>
                <img className="close" src={Close} onClick={() => props.closeSelection()}></img>
            </div>
            <div className="search-selection-body">
                <form>
                    <input type="text" placeholder="Search user with mutual followings"></input>
                </form>
                <div className="center-button">
                <button className="continue-button">Next</button>
                <button className="continue-button" onClick={() => props.setSearchPage(0)}>Back</button>
                </div>
            </div>
        </div>
    );

}

export default MutualFollowingSearch;