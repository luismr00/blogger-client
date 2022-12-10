import React, { useEffect, useState } from "react";

function HobbyOptionSelected(props) { 

    const [hover, setHover] = useState(false);
    const [selected, setSelected] = useState(props.check);

    // if(props.reset && props.check) {
    //     console.log("Should reset hobby #" + props.id);
    //     setSelected(true);
    // }

    //function to use selected state and selectHobby prop function one after the other
    const handleSelection = (hobby) => {
        setSelected(selected ? false : true);       
        props.selectHobby(hobby);
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
        <div className="hobby-option" id={props.id}
            style={selected ? hobbySelected : sectionStyle} 
            onClick={()=>handleSelection(props.hobby)} 
            onMouseEnter={()=>setHover(true)} 
            onMouseLeave={() => setHover(false)}>
            <p>
                {props.hobby}
            </p>
        </div>      
    );

}

export default HobbyOptionSelected;