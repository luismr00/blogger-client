import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import HobbyOption from "./HobbyOption";
import HobbyOptionSelected from "./HobbyOptionSelected";
import ManageHobbies from "./ManageHobbies";
import UserIcon from "../assets/person-circle.svg"
import NotAvailable from "./NotAvailable";

function HobbiesDisplay(props) { 

    const [hover, setHover] = useState(false);
    const history = useHistory();
    const [showLogout, setShowLogout] = useState(false);

    const logout = async () => {
        const res = await fetch("https://mysql-blogger.herokuapp.com/logout", {
          method: "GET",
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        })
        const data = await res.json();
        if(data.success) {
          console.log("logout successful");
          props.setAuthenticated(false);
          props.setUser(null);
          history.push("/");
        } else {
          console.log("logout failed");
        }
    }

    const selectHobby = (hobby) => {

        let matches = true;

        //Add hobby but check and remove first if it exits for handling hobby selections properly
        if(props.tempHobbies.has(hobby))
            props.tempHobbies.delete(hobby);
        else
            props.tempHobbies.add(hobby);

        //Turn tempHobbies to an array and then map its values to check if they exist using selectedHobbies.has()
        //Note: verify first if tempHobbies and selectedHobbies sizes are equal to avoid traversing with the map method when its unnecessary
        if (props.tempHobbies.size !== props.selectedHobbies.size) {
            props.setSavePopup("visible");
        } else {
            Array.from(props.tempHobbies).map((hobby) => {
                if(!props.selectedHobbies.has(hobby)) {
                    matches = false;
                }
            });

            //If all hobbies matched while running the map iteration, matches variable will always remain true and hence we hide popup, else we show
            if(matches === true) 
                props.setSavePopup("hidden");
            else
                props.setSavePopup("visible");
        }
    }

    const addHobbies = async (addList, hobbies) => {
        const res = await fetch("https://mysql-blogger.herokuapp.com/api/addHobbies", {
            method: "POST",
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                list: addList
            }),
        }) 
        const data = await res.json();
        if(data.success) {
            props.setSelectedHobbies(new Set(hobbies));
            props.setSavePopup("hidden");
            props.setUserHobbies(hobbies);
        } else {
            console.log("create failed");
        }
    }

    const deleteHobbies = async (deleteList, hobbies) => {
        const res = await fetch("https://mysql-blogger.herokuapp.com/api/deleteHobbies", {
            method: "POST",
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                list: deleteList
            }),
        }) 
        const data = await res.json();
        if(data.success) {
            console.log("create successful");
            props.setSelectedHobbies(new Set(hobbies));
            props.setSavePopup("hidden");
            props.setUserHobbies(hobbies);

            if(props.view === 'manage') {
                props.setView("");
                props.setView("manage");
            }
        } else {
            console.log("create failed");
        }
    }

    const postHobbies = (e) => {
        e.preventDefault();

        //convert tempHobbies to array to pass to server
        let hobbies = Array.from(props.tempHobbies);
        let original = new Set(props.selectedHobbies); 
        let addList = [];
        let deleteList = [];

        //SEPERATING LIST BETWEEN ADD AND DELETE
        hobbies.map((hobby) => {
            if(original.has(hobby))
                original.delete(hobby);
            else 
                addList.push([hobby, props.user.username]);
        });

        let newList = Array.from(original);

        newList.map((hobby)=> {
            let temp = [hobby, props.user.username];
            deleteList.push(temp);
        });

        if (deleteList.length != 0) {
            deleteHobbies(deleteList, hobbies);
        } 

        if (addList.length != 0) {
            addHobbies(addList, hobbies);
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

    const hobbySelected = {
        backgroundColor: "red",
        color: "white"
    }

    const sectionStyle = {
        backgroundColor: hover ? "red" : "#D4D4D4", 
        color: hover ? "white" : "black"
    }

    return (
        <div className="column main-display" id="column-grow">
        <div className="main-content">
            <div className="main-header">
                <div className="logo-header"><p>B</p></div>
                <h1>Hobbies</h1>
                <div className="user-icon-header" onClick={()=>showLogout ? setShowLogout(false) : setShowLogout(true)}>
                    <img src={UserIcon}></img>
                </div>
            </div>
            <div className="select-button">
                <div className="selection-button" onClick={() => props.setHobbySelection("visible")}><p>Hi {props.user.name}, would you like to add a new hobby or modify existing ones?</p></div>
            </div>
            <div className="hobby-container">
                {props.view === 'main' ? 
                    props.selectedHobbies.size != 0 ?
                        <div>
                            <div className="hobby-header">
                                <h4>Main Hobbies</h4>
                                <p>Choose as many hobbies as you'd like and then hit save</p>
                            </div>
                            <div className="hobby-lists">
                                {props.hobbiesList.map((hobby, id) => (
                                    <HobbyOptionSelected key={id} id={id} hobby={hobby} selectHobby={selectHobby} check={props.selectedHobbies.has(hobby) ? true : false}/>
                                ))}
                            </div> 
                        </div>
                        :
                        <div>
                            <div className="hobby-header">
                                <h4>Main Hobbies</h4>
                                <p>Choose as many hobbies as you'd like and then hit save</p>
                            </div>
                            <div className="hobby-lists">
                                {props.hobbiesList.map((hobby, id) => (
                                    <HobbyOption key={id} id={id} hobby={hobby} selectHobby={selectHobby}/>
                                ))}
                            </div>
                        </div>
                    : props.view === "manage" ?
                    props.selectedHobbies.size === 0 ? 
                        <NotAvailable title={"No Hobbies Saved"} message={"Check one of the options in the button above to add hobbies"} button={"none"} margin={"270px 100px 0"} />
                        :
                        <div>
                            <div className="hobby-header">
                                <h4>Manage Hobbies</h4>
                                <p>Remove hobbies as you please and hit save</p>
                            </div>
                            <div className="hobby-lists">
                                {Array.from(props.selectedHobbies).map((hobby, id) => (
                                    <ManageHobbies key={id} id={id} hobby={hobby} selectHobby={selectHobby}/>
                                ))}
                            </div>
                        </div>
                    : 
                    <div></div>
                }
            </div>
            <div className="extra-space"></div>
            <div className="save-hobbies" style={{visibility: props.savePopup}}>
                <p>You have unsaved changes</p>
                <div className="hobby-buttons">
                <button className="hobby-clear" onClick={(e)=>resetHobbies(e)}>Clear</button>
                <button className="hobby-save" onClick={(e)=>postHobbies(e)}>Save</button>
                </div>
            </div>
        </div>
        <div className="user-options" style={showLogout ? {visibility: "visible"} : {visibility: "hidden"}} onClick={() => logout()}>
            <div><p>Log out</p></div>
        </div>
        </div>
    );

}

export default HobbiesDisplay;