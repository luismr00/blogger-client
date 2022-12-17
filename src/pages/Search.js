import React, { useEffect, useState } from "react";
import DotLoader from "react-spinners/DotLoader";
import { Link, useHistory } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Followings from "../components/Followings";
import SearchDisplay from "../components/SearchDisplay";
import SearchSelection from "../components/SearchSelection";
import LookUp from "../components/LookUp";
import Post from "../components/Post";
import SelectTags from "../components/SelectTags";
import BottomSidebar from "../components/BottomSidebar";

function Search() {

    const [user, setUser] = useState(null);
    const [allUsers, setAllUsers] = useState(null);
    const [mutualHobbyUsers, setMutualHobbyUsers] = useState(null);
    const [loading, setLoading] = useState("Loading");
    const [userInfoAll, setUserInfoAll] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [authenticated, setAuthenticated] = useState(false);
    const [message, setMessage] = useState("");
    const [alert, setAlert] = useState("none")
    const [postWindow, setPostWindow] = useState("hidden");
    const [BlogList,setBlogList] = useState([]);
    const [searchSelection, setSearchSelection] = useState("hidden");
    const [searchPage, setSearchPage] = useState(0);
    const [switchDisplay, setSwitchDisplay] = useState(0);
    const [userHobbies, setUserHobbies] = useState([]);
    const [tags, setTags] = useState('');
    const history = useHistory();
    let hobbySelections = new Set();

    const fetchpost = async () => {
      const res = await fetch("https://mysql-blogger.herokuapp.com/api/blogs", {
          method: "GET",
          credentials: 'include',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
      })
      const data = await res.json();
      if(data.blogs != null){
          setBlogList(data.blogs);
      }
    }

    const fetchusers = async () => {
      const res = await fetch("https://mysql-blogger.herokuapp.com/api/users", {
          method: "GET",
          credentials: 'include',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
      })
      const data = await res.json();
      if(data.users != null){
          setAllUsers(data.users);
      }
    }    

    const fetchMutualHobbyUsers = async () => {
      const res = await fetch("https://mysql-blogger.herokuapp.com/api/users/search/mutualHobbies", {
          method: "GET",
          credentials: 'include',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
      })
      const data = await res.json();
      if(data.users != null){
          setMutualHobbyUsers(data.users);
      }
    }    

    const fetchHobbies = async () => {
      const res = await fetch("https://mysql-blogger.herokuapp.com/api/getHobbies", {
          method: "GET",
          credentials: 'include',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
      })
      const data = await res.json();
      if(data.hobbies != null){
          setUserHobbies(data.hobbies);
      }
    }
  
    useEffect(() => {
      fetchusers();
      fetchpost();
      fetchHobbies();
      fetchMutualHobbyUsers();
    }, []);

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
      setAuthenticated(false);
      setUser(null);
    } else {
      console.log("logout failed");
    }
  }

  useEffect(() => {
    const fetchcookie = async () => {
      const res = await fetch("https://mysql-blogger.herokuapp.com/", {
        method: "GET",
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },

      })
      const data = await res.json();
      if(data.user != null){
        setUser(data.user);
        setAuthenticated(true);
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

  const closeSelection = () => {
    setSearchSelection("hidden");
    setSearchPage(0);
    setAlert("none");
    setMessage("");
  }

  const openPostWindow = () => {
    setSwitchDisplay(0);
    setPostWindow("visible")
  }

  const closePostWindow = () => {
    hobbySelections = new Set();
    setPostWindow("hidden");
    setSwitchDisplay(null);
    setAlert("none");
    setMessage("");
  }

  const handleUserSelection = (view, username) => {

    //must get view as well for either individual search or multiple searches
    if (view === 'single') {

      if(!allUsers[username]) {
        setMessage("User not found");
        setAlert("flex");
      } else {
        setAlert("none");
        setMessage("");
        let selected = {};
        selected[username] = allUsers[username];
        setUserInfoAll(selected);
        setUserInfo(selected);
        closeSelection();
      }

    } else if (view === 'mutual-hobbies') {
      getUserLimit(mutualHobbyUsers, 10);
      setUserInfoAll(mutualHobbyUsers);
      closeSelection();
    }
  }

  const loadingTimer = () => {
    setTimeout(() => {
      setLoading("This is taking longer than expected but hang on tight...");
    }, 30000);
  }

  const getUserLimit = (users, limit) => {
    let list = {};
    let index = 0

    for(let username in users) {
        if(index != limit) {
            list[username] = users[username];
            index++;
        }
    }

    setUserInfo(list);
  }

  const clickEvents = {
    pointerEvents: postWindow === "visible" || searchSelection === "visible" ? "none" : "auto"
  }

  const postDisplay = () => {
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
            return <SearchSelection searchSelection={searchSelection} setSearchSelection={setSearchSelection} setSearchPage={setSearchPage} closeSelection={closeSelection} handleUserSelection={handleUserSelection} />
        case 1:
          return <LookUp allUsers={allUsers} handleUserSelection={handleUserSelection} searchSelection={searchSelection} setSearchSelection={setSearchSelection} setSearchPage={setSearchPage} closeSelection={closeSelection} />
        }
      }

    return (
      <div className="default" id="main-container">
        { authenticated ?

        <div>
          {displayPage()}
          {postDisplay()}
          <div className="three-way-grid" style={clickEvents}>
            <Sidebar user={user} setAuthenticated={setAuthenticated} setUser={setUser} openPostWindow={openPostWindow} />
            <SearchDisplay user={user} userInfoAll={userInfoAll} userInfo={userInfo} getUserLimit={getUserLimit} setSearchSelection={setSearchSelection} setAuthenticated={setAuthenticated} setUser={setUser}/>
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
  
export default Search;