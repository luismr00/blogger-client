import React, { useEffect, useState } from "react";
import Close from "../assets/close.svg";

function AddHobby(props) {

    const [hobby, setHobby] = useState("");
    // const [showSearch, setShowSearch] = useState(false);
    let showSearch = false; 
    let list = null;
    let temp = null;

    // combination between main hobbies list and user hobbies list from the DB for searching purposes
    // avoiding repeats as well
    // let list = props.hobbiesList.concat(props.otherHobbies);
    temp = new Set(props.hobbiesList);

    props.otherHobbies.map((other) => {
        if(!temp.has(other))
            temp.add(other)
    });

    list = Array.from(temp);

    const validateHobby = (e) => {

        if(hobby === "") {  
            return null;
        }

        //change hobby state to lowercase
        let hobbyCopy = hobby.toLowerCase();

        let userHobbies = Array.from(props.selectedHobbies);
        let temp = [];

        userHobbies.map((val) => {
            temp.push(val.toLowerCase());
        });

        let newSet = new Set(temp);

        if(newSet.has(hobbyCopy)) 
            // console.log(true);
            return true
        else
            // console.log(false);
            return false;        
    } 

    const postHobby = async (e) => {

        e.preventDefault();
        resetHobbies();
        let hobbyExists = validateHobby();
        let newHobbies = props.userHobbies;
        newHobbies.push(hobby);

        console.log(newHobbies);

        if(hobbyExists === null) {
            props.setMessage("Field is required");
            props.setAlert("flex");
        } else if(hobbyExists === true) {
            // console.log("Cannot add existing saved hobby");
            props.setMessage("Cannot add existing saved hobby");
            props.setAlert("flex");
        } else {
            const res = await fetch("http://localhost:4000/api/hobby", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'credentials': 'include'
                },
                body: JSON.stringify({
                    hobby: hobby, 
                    // list: [[hobby, props.user.username]]
                }),
            }) 
            const data = await res.json();
            if(data.success) {
                // console.log("create successful");
                // alert("Hobby added successfully");
                setHobby("");
                props.closeSelection();
                // props.fetchHobbies();
                props.setUserHobbies(newHobbies);
                props.setSelectedHobbies(new Set(newHobbies));
                props.setTempHobbies(new Set(newHobbies));

                //SELECT THE HOBBY WITH DOCUMENT.ELEMENT....
                if(props.view === 'main') {
                    // props.fetchHobbies();
                    props.setView("");
                    props.setView("main");
                }

                props.setMessage("Hobby added successfully");
                props.setAlert("flex");
                setTimeout(() => {
                    props.setAlert("none");
                }, 3000);

            } else {
                // console.log("create failed");
                props.setMessage("Create failed");
                props.setAlert("flex");
                setTimeout(() => {
                    props.setAlert("none");
                }, 3000);
            }
        }
    }

    const resetHobbies = async (e) => {

        await props.fetchHobbies();

        if(props.view === 'main') {
            props.setView("");
            props.setView("main");
        } else if (props.view === "manage") {
            props.setView("");
            props.setView("manage");
        }
    }

    const display = {
        visibility: showSearch ? "visible" : "hidden"
    }

    return (
        <div className="search-select" id="hobby-search" style={{visibility: props.searchSelection}}>
            <div className="header-selection">
                <h3>Add hobby</h3>
                <img className="close" src={Close} onClick={() => props.closeSelection()}></img>
            </div>
            <div className="search-selection-body" id="hobby-search-body">
                <p className="hobby-search-header">Can't find your hobby? Don't worry. We'll check hobbies from other users as well and still try to match your search with a similar hobby.</p>
                <form className="hobby-search-input">
                    <input 
                        // className="hobby-search-input"
                        type="text" 
                        placeholder="Search" 
                        value={hobby} 
                        onChange={(e) => setHobby(e.target.value)}>
                    </input>
                </form>

                <div className="search-results">
                {list ?
                    list.filter((value, key) => {
                        if(hobby === "") {
                            showSearch = false;
                            return value;
                        } else if (value.toLowerCase().substring(0, hobby.length).includes(hobby.toLowerCase())) {
                            showSearch = true;
                            return value;
                        }}).map((value, key) => {
                            return (
                                <div 
                                    className="search-hobby" 
                                    key={key} 
                                    onClick={() => setHobby(value)}
                                    style={showSearch === true ? {display: "flex", visibility: "visible"} : {display: "none", visibility: "hidden"}}>
                                        <p>{value}</p>
                                </div>
                        );
                    }) :
                    <div></div>

                }
                </div>
                <div className="center-button">
                <button className="continue-button" onClick={(e) => postHobby(e)}>Next</button> 
                <button className="continue-button" onClick={() => props.setSearchPage(0)}>Back</button>
                </div>
            </div>
        </div>
    );

}

export default AddHobby;