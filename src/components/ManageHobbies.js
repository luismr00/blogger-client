import React, { useEffect, useState } from "react";

function ManageHobbies(props) { 

    const [hover, setHover] = useState(false);
    const [selected, setSelected] = useState(true);

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
        <div className="hobby-option" 
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

export default ManageHobbies;