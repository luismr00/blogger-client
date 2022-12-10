import React, { useEffect, useState } from "react";
import Close from "../assets/close.svg";
import { main_hobbies } from "../data/mainHobbies";

const list = ['1','2','3'];

function LookUp(props) {

    const [search, setSearch] = useState("");
    let showSearch = false; 

    return (
        <div className="search-select" id="search" style={{visibility: props.searchSelection}}>
            <div className="header-selection">
                <h3>Search</h3>
                <img className="close" src={Close} onClick={() => props.closeSelection()}></img>
            </div>
            <div className="search-selection-body" id="search-body">
                <form className="hobby-search-input">
                    {/* <input type="text" placeholder="Search users"></input> */}
                    <input 
                        // className="hobby-search-input"
                        type="text" 
                        placeholder="Search" 
                        value={search} 
                        onChange={(e) => setSearch(e.target.value)}>
                    </input>
                </form>

                <div className="search-results">
                {console.log(props.allUsers)}
                {Object.keys(props.allUsers).filter((username, key) => {
                    if(search === "") {
                        showSearch = false;
                        return username;
                    } else if (username.toLowerCase().substring(0, search.length).includes(search.toLowerCase())) {
                        showSearch = true;
                        return username;
                    }}).map((username, key) => {
                        return (
                            <div 
                                className="search-hobby" 
                                key={key} 
                                onClick={() => setSearch(username)}
                                style={showSearch === true ? {display: "flex", visibility: "visible"} : {display: "none", visibility: "hidden"}}>
                                    <p>{username}</p>
                            </div>
                    );
                })}
                </div>

                <div className="center-button">
                <button className="continue-button" onClick={() => props.handleUserSelection("single", search)}>Next</button>
                <button className="continue-button" onClick={() => props.setSearchPage(0)}>Back</button>
                </div>
            </div>
        </div>
    );

}

export default LookUp;