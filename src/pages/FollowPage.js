import React, { useEffect, useState } from "react";
import DotLoader from "react-spinners/DotLoader";
import { useLocation } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Followings from "../components/Followings";
import Post from "../components/Post";
import SelectTags from "../components/SelectTags";
import FollowPageDisplay from "../components/FollowPageDisplay";
import BottomSidebar from "../components/BottomSidebar";

function FollowPage(props) {

    const location = useLocation();
    const { pathname } = location;
    const [user, setUser] = useState(null);
    const [follower, setFollower] = useState(null);
    const [authenticated, setAuthenticated] = useState(false);
    const [message, setMessage] = useState("");
    const [alert, setAlert] = useState("none")
    const [loading, setLoading] = useState("Loading");
    const [postWindow, setPostWindow] = useState("hidden");
    const [BlogList,setBlogList] = useState([]);
    const [switchDisplay, setSwitchDisplay] = useState(0);
    const [userHobbies, setUserHobbies] = useState([]);
    const [tags, setTags] = useState('');
    const history = useHistory();
    let hobbySelections = new Set();

    const fetchpost = async () => {
      const res = await fetch(`https://mysql-blogger.herokuapp.com/api/${pathname.split("/")[2]}/blogs`, {
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
      fetchpost();
      fetchHobbies();
    }, []);

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
        setFollower(data.user.username);
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
    pointerEvents: postWindow != "hidden" ? "none" : "auto"
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

  const loadingTimer = () => {
    setTimeout(() => {
      setLoading("This is taking longer than expected but hang on tight...");
    }, 30000);
  }


  const postDisplay = () => {
    switch(switchDisplay) {
        case 0: 
            return <SelectTags setMessage={setMessage} setAlert={setAlert} setTags={setTags} hobbySelections={hobbySelections} userHobbies={userHobbies} setSwitchDisplay={setSwitchDisplay} postWindow = {postWindow} closePostWindow={closePostWindow} tagDisplay={userHobbies.length === 0 ? false : true}/>
        case 1: 
            return <Post user={user} setMessage={setMessage} setAlert={setAlert} tags={tags} setTags={setTags} setSwitchDisplay={setSwitchDisplay} postWindow = {postWindow} closePostWindow={closePostWindow} fetchpost={fetchpost}/>
      }
  }

    return (
      <div className="default" id="main-container">
        { authenticated ?

        <div>
          {postDisplay()}
          <div className="three-way-grid" style={clickEvents}>
            <Sidebar user={user} setAuthenticated={setAuthenticated} setUser={setUser} openPostWindow={openPostWindow} />
            <FollowPageDisplay user={user} view={location.state ? location.state.view : null} setAuthenticated={setAuthenticated} setUser={setUser}/>
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
  
export default FollowPage;