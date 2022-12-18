import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import UserIcon from "../assets/person-circle.svg";
import UserSearchResult from "./UserSearchResult";
import NotAvailable from "./NotAvailable";

function SearchDisplay(props) { 

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

    return (
        <div className="column main-display" id="column-grow">
            <div className="main-content">
                <div className="main-header">
                    <div className="logo-header"><p>B</p></div>
                    <h1>Search</h1>
                    <div className="user-icon-header" onClick={()=>showLogout ? setShowLogout(false) : setShowLogout(true)}>
                        <img src={UserIcon}></img>
                    </div>
                </div>
                <div className="select-button">
                    <div className="selection-button" onClick={() => props.setSearchSelection("visible")}><p>Hi {props.user.name}, what would you like to search for today?</p></div>
                </div>
                {props.userInfo ? 
                    JSON.stringify(props.userInfo) === '{}' ?
                        <NotAvailable title={"No matching users"} message={"Either select more hobbies or follow more users to view results."} button={"none"} margin={"270px 100px 0"} />
                        :
                        Object.keys(props.userInfo).map((u, index) => {
                            return(
                                <UserSearchResult user={props.userInfo[u]} username={u} sessionUser={props.user} key={index} />
                            );
                        })
                    :
                    <NotAvailable title={"Search users"} message={"Click on the button above to view search options. Please note to make friends both users must follow each other first."} button={"none"} margin={"250px 100px 0"} />
                } 
            </div>
            {props.userInfoAll && props.userInfo ?
                Object.keys(props.userInfo).length === Object.keys(props.userInfoAll).length ?
                    <div></div>
                    :
                    <div className='load-blogs'>
                        <p className='load-blogs-text' onClick={() => props.getUserLimit(props.userInfoAll, props.userInfo.length + 10)}>Show more</p>
                    </div>
            :
            <div></div>
            }
            <div className="user-options" style={showLogout ? {visibility: "visible"} : {visibility: "hidden"}} onClick={() => logout()}>
                <div><p>Log out</p></div>
            </div>
        </div>
    );

}

export default SearchDisplay;