import React, { useEffect, useState } from "react";
import DotLoader from "react-spinners/DotLoader";
import { useHistory } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import Sidebar from "../components/Sidebar";
import Homeblogs from "../components/Homeblogs";
import Followings from "../components/Followings";
import Post from "../components/Post";
import BlogSelection from "../components/BlogsSelection";
import SelectTags from "../components/SelectTags";
import BottomSidebar from "../components/BottomSidebar";

function UserPage() {
  const [user, setUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [message, setMessage] = useState("");
  const [alert, setAlert] = useState("none")
  const [loading, setLoading] = useState("Loading");
  const history = useHistory();
  const [blogSelection, setBlogSelection] = useState("hidden");
  const [BlogList,setBlogList] = useState([]);
  const [BlogLimit,setBlogLimit] = useState([]);
  const [BlogListALL,setBlogListALL] = useState([]);
  const [BlogListNC, setBlogListNC] = useState([]);
  const [BlogListMPR,setBlogListMPR] = useState([]);
  const [BlogListMNR,setBlogListMNR] = useState([]);
  const [BlogListOPR,setBlogListOPR] = useState([]);
  const [blogListHobbies, setBlogListHobbies] = useState([]);
  const [postWindow, setPostWindow] = useState("hidden");
  const [switchDisplay, setSwitchDisplay] = useState(0);
  const [userHobbies, setUserHobbies] = useState([]);
  const [tags, setTags] = useState('');
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
        setBlogLimit(data.blogs.slice(0,10));
        setBlogListALL(data.blogs);
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

  const fetchpostNC = async () => {
    const res = await fetch("https://mysql-blogger.herokuapp.com/api/blogsNC", {
        method: "GET",
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    })
    const data = await res.json();
    if(data.blogs != null){
        setBlogListNC(data.blogs);
    }
  }

  const fetchpostMPR = async () => {
    const res = await fetch("https://mysql-blogger.herokuapp.com/api/blogsMPR", {
        method: "GET",
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    })
    const data = await res.json();
    if(data.blogs != null){
        setBlogListMPR(data.blogs);
    }
  }

  const fetchpostMNR = async () => {
    const res = await fetch("https://mysql-blogger.herokuapp.com/api/blogsMNR", {
        method: "GET",
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    })
    const data = await res.json();
    if(data.blogs != null){
        setBlogListMNR(data.blogs);
    }
  }

  const fetchpostOPR = async () => {
    const res = await fetch("https://mysql-blogger.herokuapp.com/api/blogsOPR", {
        method: "GET",
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    })
    const data = await res.json();
    if(data.blogs != null){
        setBlogListOPR(data.blogs);
    }
  }

  const fetchpostHobbies = async () => {
    const res = await fetch("https://mysql-blogger.herokuapp.com/api/hobbyBlogs", {
        method: "GET",
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    })
    const data = await res.json();
    if(data.blogs != null){
        setBlogListHobbies(data.blogs);
    }
  }

  useEffect(() => {
    fetchpost();
    fetchHobbies();
    fetchpostNC();
    fetchpostMPR();
    fetchpostMNR();
    fetchpostOPR();
    fetchpostHobbies();
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

  const clickEvents = {
    // pointerEvents: postWindow != "hidden" ? "none" : "auto"
    pointerEvents: postWindow === "visible" || blogSelection === "visible" ? "none" : "auto"
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
        { authenticated || user ?

          <div>
            {postDisplay()}
            <BlogSelection 
              blogSelection={blogSelection} 
              setBlogSelection={setBlogSelection}
              setBlogList={setBlogList}
              setBlogLimit={setBlogLimit}
              BlogListALL={BlogListALL}
              BlogListNC={BlogListNC}
              BlogListMPR={BlogListMPR}
              BlogListMNR={BlogListMNR}
              BlogListOPR={BlogListOPR}
              BlogListHobbies={blogListHobbies}
            /> 
            <div className="three-way-grid" style={clickEvents}>
              <Sidebar user={user} setAuthenticated={setAuthenticated} setUser={setUser} openPostWindow={openPostWindow} />
              <Homeblogs user = {user} setBlogSelection={setBlogSelection} BlogList={BlogList} BlogLimit={BlogLimit} setBlogLimit={setBlogLimit} setAuthenticated={setAuthenticated} setUser={setUser} />
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
  
export default UserPage;