import React, { useEffect, useState } from "react";
import DotLoader from "react-spinners/DotLoader";
import { Link, useHistory } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Followings from "../components/Followings";
import HobbiesDisplay from "../components/HobbiesDisplay";
import Post from "../components/Post";
// import SearchDisplay from "../components/SearchDisplay";
// import SearchSelection from "../components/SearchSelection";
// import LookUp from "../components/LookUp";
import HobbySelection from "../components/HobbySelection";
import AddHobby from "../components/AddHobby";
import HobbyCategories from "../components/HobbyCategories";
import SelectTags from "../components/SelectTags";
import BottomSidebar from "../components/BottomSidebar";


function Hobbies() {

    const [user, setUser] = useState(null);
    const [authenticated, setAuthenticated] = useState(false);
    const [message, setMessage] = useState("");
    const [alert, setAlert] = useState("none")
    const [loading, setLoading] = useState("Loading");
    const [postWindow, setPostWindow] = useState("hidden");
    const [BlogList,setBlogList] = useState([]);
    const [hobbySelection, setHobbySelection] = useState("hidden");
    const [searchPage, setSearchPage] = useState(0);
    const [view, setView] = useState("main");
    const [savePopup, setSavePopup] = useState("hidden");
    const [hobbiesList, setHobbiesList] = useState([]);
    const [otherHobbies, setOtherHobbies] = useState([]);
    const [selectedHobbies, setSelectedHobbies] = useState(new Set());
    const [tempHobbies, setTempHobbies] = useState(new Set()); 
    const [switchDisplay, setSwitchDisplay] = useState(0);
    const [userHobbies, setUserHobbies] = useState([]);
    const [tags, setTags] = useState('');
    const history = useHistory();
    let hobbySelections = new Set();

    const fetchpost = async () => {
      const res = await fetch("http://localhost:4000/api/blogs", {
          method: "GET",
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
      })
      const data = await res.json();
      if(data.blogs != null){
          console.log("fetching post from mainpage component")
          console.log(data.blogs);
          setBlogList(data.blogs);
      }
    }

    //Fetch all user hobbies list
    const fetchUsersHobbyList = async () => {
      const res = await fetch("http://localhost:4000/api/users_hobbies_list", {
          method: "GET",
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
      })
      const data = await res.json();
      if(data.hobbies != null){
          setOtherHobbies(data.hobbies);
          console.log("checking other hobby list from users");
          console.log(data.hobbies);
      }
    }

    const fetchHobbyList = async () => {
      const res = await fetch("http://localhost:4000/api/hobbies_list", {
          method: "GET",
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
      })
      const data = await res.json();
      if(data.hobbies != null){
          setHobbiesList(data.hobbies);
      }
    }

    const fetchHobbies = async () => {
      const res = await fetch("http://localhost:4000/api/getHobbies", {
          method: "GET",
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
      })
      const data = await res.json();
      if(data.hobbies != null){

          // console.log("Showing hobbies fetched");
          // console.log(JSON.stringify(data.hobbies));
          setSelectedHobbies(new Set(data.hobbies));
          // console.log(selectedHobbies);
          setTempHobbies(new Set(data.hobbies));
          setUserHobbies(data.hobbies);
      }
    }
  
    useEffect(() => {
      fetchpost();
      fetchHobbyList();
      fetchUsersHobbyList();
    }, []);

    useEffect(() => {
      setSavePopup("hidden");
      fetchHobbies();
    }, [view]);

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
      setAuthenticated(false);
      setUser(null);
    } else {
      console.log("logout failed");
    }
  }

  useEffect(() => {
    const fetchcookie = async () => {
      const res = await fetch("http://localhost:4000/", {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },

      })
      const data = await res.json();
      if(data.user != null){
        setUser(data.user);
        setAuthenticated(true);
        console.log(data.user)
      } else {
        console.log("user is not logged in");
        setAuthenticated(false);
        history.push("/");
      }
    }
    if(!authenticated){
      fetchcookie();
    }
  }, [authenticated]);

  const clickEvents = {
    // pointerEvents: postWindow != "hidden" ? "none" : "auto"
    pointerEvents: postWindow === "visible" || hobbySelection === "visible" ? "none" : "auto"
  }

  const closeSelection = () => {
    setHobbySelection("hidden");
    setSearchPage(0);
    setAlert("none");
    setMessage("");
  }

  const openPostWindow = () => {
    setSwitchDisplay(0);
    setPostWindow("visible")
  }

  const closePostWindow = () => {
    // console.log("hobbySelections values before closing and after");
    // console.log(hobbySelections);
    hobbySelections = new Set();
    setPostWindow("hidden");
    setSwitchDisplay(null);
    setAlert("none");
    setMessage("");
    // console.log(hobbySelections);
  }

  const loadingTimer = () => {
    setTimeout(() => {
      setLoading("This is taking longer than expected but hang on tight...");
    }, 30000);
  }

  const postDisplay = () => {
    // console.log(switchDisplay);
    switch(switchDisplay) {
        case 0: 
            return <SelectTags setMessage={setMessage} setAlert={setAlert} setTags={setTags} hobbySelections={hobbySelections} userHobbies={userHobbies} setSwitchDisplay={setSwitchDisplay} postWindow = {postWindow} closePostWindow={closePostWindow} tagDisplay={userHobbies.length === 0 ? false : true}/>
        case 1: 
            return <Post user={user} setMessage={setMessage} setAlert={setAlert} tags={tags} setTags={setTags} setSwitchDisplay={setSwitchDisplay} postWindow = {postWindow} closePostWindow={closePostWindow} fetchpost={fetchpost}/>
      }
  }

  const displayPage = () => {
    switch(searchPage) {
        case 0: 
            return <HobbySelection hobbySelection={hobbySelection} setHobbySelection={setHobbySelection} setSearchPage={setSearchPage} closeSelection={closeSelection} setView={setView} />
        case 1: 
            return <AddHobby user={user} view={view} setView={setView} setMessage={setMessage} setAlert={setAlert} hobbiesList={hobbiesList} otherHobbies={otherHobbies} selectedHobbies={selectedHobbies} setTempHobbies={setTempHobbies} hobbySelection={hobbySelection} setHobbySelection={setHobbySelection} setSearchPage={setSearchPage} closeSelection={closeSelection} userHobbies={userHobbies} setUserHobbies={setUserHobbies} setSelectedHobbies={setSelectedHobbies} fetchHobbies={fetchHobbies} />
        // case 2: 
        //     return <HobbyCategories hobbySelection={hobbySelection} setHobbySelection={setHobbySelection} setSearchPage={setSearchPage} closeSelection={closeSelection} />
      }
  }

    return (
      <div className="default" id="main-container">
        { authenticated ?

        <div>
          {postDisplay()}
          {displayPage()}
          {/* <Post postWindow = {postWindow} showPostWindow={setPostWindow} fetchpost={fetchpost}/> */}
          <div className="three-way-grid" style={clickEvents}>
            <Sidebar user={user} setAuthenticated={setAuthenticated} setUser={setUser} openPostWindow={openPostWindow} />
            {/* <SearchDisplay user={user} setSearchSelection={setSearchSelection}/> */}
            <HobbiesDisplay fetchHobbies={fetchHobbies} setHobbiesList={setHobbiesList} user={user} setHobbySelection={setHobbySelection} view={view} setView={setView} savePopup={savePopup} setSavePopup={setSavePopup} hobbiesList={hobbiesList} selectedHobbies={selectedHobbies} setSelectedHobbies={setSelectedHobbies} tempHobbies={tempHobbies} setTempHobbies={setTempHobbies} userHobbies={userHobbies} setUserHobbies={setUserHobbies} setAuthenticated={setAuthenticated} setUser={setUser} />
            <Followings user={user} />
          </div>
        </div>
          : 
          <div className="loader">
            {loadingTimer()}
            <DotLoader
              color={"#FF2301"}
              loading={true}
              size={80}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
            <p style={{fontSize: "24px", margin: "40px 0 0 0"}}>{loading}</p>
          </div>
        }
        <BottomSidebar user={user} setAuthenticated={setAuthenticated} setUser={setUser} openPostWindow={openPostWindow} />
        <div class="message" style={{display: alert}}>
          <div style={{margin: "0px"}}>
            <p>{message}</p>
          </div>
        </div>
      </div>
    );
}
  
export default Hobbies;