import React from "react";

function NotAvailable(props) {
    return(
        <div>
            <div className="main-content">
                <div className="empty-content" style={{margin: props.margin}}>
                    <h3>{props.title}</h3>
                    <p>{props.message}</p>
                    <a href="/search" style={{marginTop: "20px"}}>
                        <button className="continue-button" style={props.button === "none" ? {display: "none"} : {display: "block"}}>{props.button}</button>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default NotAvailable;

