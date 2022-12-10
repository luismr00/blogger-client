import React, { useEffect, useState } from "react";
import Close from "../assets/close.svg";

function HobbyCategories(props) {
    return (
        <div className="search-select" style={{visibility: props.searchSelection}}>
            <div className="header-selection">
                <h3>Select Categories</h3>
                <img className="close" src={Close} onClick={() => props.closeSelection()}></img>
            </div>
            <div className="blog-switch-body">
                {/* <form>
                    <input type="text" placeholder="hobby"></input>
                </form> */}
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"></input>
                    <label class="form-check-label" for="flexCheckDefault">
                        All Hobbies
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked"></input>
                    <label class="form-check-label" for="flexCheckChecked">
                        Indoor Hobbies
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked"></input>
                    <label class="form-check-label" for="flexCheckChecked">
                        Outdoor Hobbies
                    </label>
                </div>
                <div className="center-button">
                <button className="continue-button">Next</button>
                <button className="continue-button" onClick={() => props.setSearchPage(0)}>Back</button>
                </div>
            </div>
        </div>
    );

}

export default HobbyCategories;