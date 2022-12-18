import React, { useState } from "react";

function TagOption(props) {
  const [selected, setSelected] = useState(false);

    const handleSelection = (hobby) => {
        if(selected)
            setSelected(false);
        else
            setSelected(true);
            
        props.handleHobbies(hobby);

    }

    const hobbyColors = {
        backgroundColor: selected ? "red" : "#D4D4D4", 
        color: selected ? "white" : "black"
    }

    return (
        <div 
        className="tag-selection" 
        key={props.key}
        onClick={() => handleSelection(props.hobby)}
        style={hobbyColors}
        >
            <p>{props.hobby}</p>
        </div>
    );

}

export default TagOption;