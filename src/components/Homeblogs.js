import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Blogs from "./Blogs";
import UserIcon from "../assets/person-circle.svg"
import NotFound from "./NotFound";
import NotAvailable from "./NotAvailable";

function Homeblogs(props) { 

    const history = useHistory();
    const [showLogout, setShowLogout] = useState(false);

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

    return (
        <div className="column main-display" id="column-grow">
            <div className="main-content">
                <div className="main-header">
                    <div className="logo-header"><p>B</p></div>
                    <h1>Home</h1>
                    <div className="user-icon-header" onClick={()=>showLogout ? setShowLogout(false) : setShowLogout(true)}>
                        <img src={UserIcon}></img>
                    </div>
                </div>
                <div className="select-button">
                    <div className="selection-button" onClick={() => props.setBlogSelection("visible")}><p>Hi {props.user.name}, what would you like to check today?</p></div>
                </div>
                {props.BlogList.length != 0 ?
                    
                    <Blogs BlogList={props.BlogList} BlogLimit={props.BlogLimit} setBlogLimit={props.setBlogLimit}/>
                    :
                    // <NotFound />
                    <NotAvailable title={"No blogs available"} message={"Select a different selection from the button above or follow users to view more blogs"} button={"Search"} margin={"200px 100px 0"} />

                    
                }
            </div>
            <div className="user-options" style={showLogout ? {visibility: "visible"} : {visibility: "hidden"}} onClick={() => logout()}>
                <div><p>Log out</p></div>
            </div>
        </div>
    );

}

export default Homeblogs;