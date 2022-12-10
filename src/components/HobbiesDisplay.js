import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import HobbyOption from "./HobbyOption";
import HobbyOptionSelected from "./HobbyOptionSelected";
import { main_hobbies } from "../data/mainHobbies.js";
import ManageHobbies from "./ManageHobbies";
import UserIcon from "../assets/person-circle.svg"
import NotFound from "./NotFound";
import NotAvailable from "./NotAvailable";

function HobbiesDisplay(props) { 

    // const [colorBG, setColorBG] = useState("#D4D4D4");
    // const [textColor, setTextColor] = useState("black");
    const [hover, setHover] = useState(false);
    const history = useHistory();
    const [showLogout, setShowLogout] = useState(false);
    // const [selected, setSelected] = useState(false);
    // const [savePopup, setSavePopup] = useState("hidden");
    // const [hobbiesList, setHobbyList] = useState([]);
    // const [userHobbiesAmount, setUserHobbiesAmount] = useState(0); //must use another variable to compare the initial size vs the new size of hobbies
    // const [selectedHobbies, setSelectedHobbies] = useState(new Set());
    // const [tempHobbies, setTempHobbies] = useState(new Set());

    const logout = async () => {
        const res = await fetch("http://localhost:4000/logout", {
          method: "GET",
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

        console.log("Save popup value: " + props.savePopup);

        console.log("Checking selectedHobbies and tempHobbies at the beginning");
        console.log(props.selectedHobbies);
        console.log(props.tempHobbies);

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

        console.log("Checking same variables at the end now");
        console.log(props.selectedHobbies);
        console.log(props.tempHobbies);


        //Stringify selectedHobbies and tempHobbies for comparison verification
        // let temp1 = JSON.stringify(Array.from(tempHobbies));
        // let temp2 = JSON.stringify(Array.from(selectedHobbies));

        // tempHobbies.add("hi");

        // if(temp1 === temp2)
            //hide savePopup
            // console.log(true);
            // setSavePopup("hidden");
        // else
            //show savePopup
            // console.log(false);
            // setSavePopup("visible");


        
        // console.log(temp1);
        // console.log(temp2);

        //replace userHobbiesAmount to display popup

        // let count = userHobbiesAmount;

        // if(selectedHobbies.has(hobby)) {
        //     count--;
        //     selectedHobbies.delete(hobby);
        //     setUserHobbiesAmount(count);
        //  } else { 
        //     count++;
        //     selectedHobbies.add(hobby);
        //     setUserHobbiesAmount(count);
        //  }

        // console.log(selectedHobbies);

        // console.log(hobby);
        // console.log(userHobbiesAmount);
    }

    // const fetchHobbyList = async () => {
    //     const res = await fetch("http://localhost:4000/api/hobbies_list", {
    //         method: "GET",
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json',
    //         },
    //     })
    //     const data = await res.json();
    //     if(data.hobbies != null){
    //         setHobbyList(data.hobbies);
    //     }
    // }

    // const fetchHobbies = async () => {
    //     const res = await fetch("http://localhost:4000/api/getHobbies", {
    //         method: "GET",
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json',
    //         },
    //     })
    //     const data = await res.json();
    //     if(data.hobbies != null){

    //         console.log("Showing hobbies fetched");
    //         console.log(data.hobbies);
    //         setSelectedHobbies(new Set(data.hobbies));
    //         console.log(selectedHobbies);
    //         setTempHobbies(new Set(data.hobbies));
    //     }
    // }

    //   useEffect(() => {
    //     setSavePopup("hidden");
    //     fetchHobbies();
    //   }, [props.view]);
    
    //   useEffect(() => {
    //     fetchHobbyList();
    //   }, []);

    const addHobbies = async (addList, hobbies) => {
        const res = await fetch("http://localhost:4000/api/addHobbies", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'credentials': 'include'
            },
            body: JSON.stringify({
                list: addList
                // previousHobbies: Array.from(props.selectedHobbies), 
                // hobbies: hobbies,
            }),
        }) 
        const data = await res.json();
        if(data.success) {
            console.log("create successful");
            // alert("Hobbies added successfully");
            //reset selectedHobbies and tempHobbies if necessary
            //pass a different copy of tempHobbies to avoid selectedHobbies and tempHobbies behaving like pointers after
            props.setSelectedHobbies(new Set(hobbies));
            //hide savePopup ofc
            props.setSavePopup("hidden");
            props.setUserHobbies(hobbies);
        } else {
            console.log("create failed");
        }
    }

    const deleteHobbies = async (deleteList, hobbies) => {
        const res = await fetch("http://localhost:4000/api/deleteHobbies", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'credentials': 'include'
            },
            body: JSON.stringify({
                list: deleteList
                // previousHobbies: Array.from(props.selectedHobbies), 
                // hobbies: hobbies,
            }),
        }) 
        const data = await res.json();
        if(data.success) {
            console.log("create successful");
            // alert("Hobbies deleted successfully");
            //reset selectedHobbies and tempHobbies if necessary
            //pass a different copy of tempHobbies to avoid selectedHobbies and tempHobbies behaving like pointers after
            props.setSelectedHobbies(new Set(hobbies));
            //hide savePopup ofc
            props.setSavePopup("hidden");
            props.setUserHobbies(hobbies);

            if(props.view === 'manage') {
                // props.fetchHobbies();
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

        console.log("Sending the following data to the server");
        console.log(addList);
        console.log(deleteList);

        if (deleteList.length != 0) {
            deleteHobbies(deleteList, hobbies);
        } 

        if (addList.length != 0) {
            addHobbies(addList, hobbies);
        }

        // const res = await fetch("http://localhost:4000/api/hobbies", {
        //     method: "POST",
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json',
        //         'credentials': 'include'
        //     },
        //     body: JSON.stringify({
        //         previousHobbies: Array.from(props.selectedHobbies), 
        //         hobbies: hobbies,
        //     }),
        // }) 
        // const data = await res.json();
        // if(data.success) {
        //     console.log("create successful");
        //     alert("Hobbies added successfully");
        //     //reset selectedHobbies and tempHobbies if necessary
        //     //pass a different copy of tempHobbies to avoid selectedHobbies and tempHobbies behaving like pointers after
        //     props.setSelectedHobbies(new Set(hobbies));
        //     //hide savePopup ofc
        //     props.setSavePopup("hidden");
        //     props.setUserHobbies(hobbies);
        // } else {
        //     console.log("create failed");
        // }
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

    // const removeSelectedHobby = ()

    const hobbySelected = {
        backgroundColor: "red",
        color: "white"
    }

    const sectionStyle = {
        backgroundColor: hover ? "red" : "#D4D4D4", 
        color: hover ? "white" : "black"
        // backgroundColor: "red"
    }

    // const showSavePopup = {
    //     visibility: userHobbiesAmount === 0 ? "hidden" : "visible"
    // }

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
                        // <div className="hobby-lists">You have no hobbies saved</div>
                        // <NotFound />
                        <NotAvailable title={"No Hobbies Saved"} message={"Check one of the options in the button above to add hobbies"} button={"none"} margin={"270px 100px 0"} />
                        :
                        <div>
                            <div className="hobby-header">
                                <h4>Manage Hobbies</h4>
                                <p>Remove hobbies as you please and hit save</p>
                            </div>
                            <div className="hobby-lists">
                                {/* {console.log(Array.from(props.selectedHobbies))} */}
                                {Array.from(props.selectedHobbies).map((hobby, id) => (
                                    <ManageHobbies key={id} id={id} hobby={hobby} selectHobby={selectHobby}/>
                                ))}
                            </div>
                        </div>
                    : 
                    <div></div>
                }
            </div>
            {/* <br></br>
            <br></br>
            <br></br> */}
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