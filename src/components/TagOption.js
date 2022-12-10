import React, { useEffect, useState } from "react";

function TagOption(props) {
//   const [tags, setTags] = useState('');
  const [selected, setSelected] = useState(false);

    const handleSelection = (hobby) => {
        // console.log("save selection and change color");
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
            {/* {console.log("inserting option...")} */}
            <p>{props.hobby}</p>
        </div>
    );

}

export default TagOption;