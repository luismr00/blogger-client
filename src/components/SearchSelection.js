import React from "react";
import Close from "../assets/close.svg";

function SearchSelection(props) {
    return (
        <div className="search-select" style={{visibility: props.searchSelection}}>
            <div className="header-selection">
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
            </div>
        </div>
    );

}

export default SearchSelection;