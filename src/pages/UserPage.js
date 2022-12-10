import React, { useEffect, useState } from "react";
import DotLoader from "react-spinners/DotLoader";
import { Link, useHistory } from "react-router-dom";
import DatePicker from "react-datepicker";
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
  const [noBlogList, setNoBlogList] = useState([]);
  const [noCommentsList, setNoCommentsList] = useState([]);
  const [postNegativeList, setPostNegativeList] = useState([]);
  const [noNegativeCommentsOnPostList, setNoNegativeCommentsOnPostList] = useState([]);
  const [maxPostOnDateList, setMaxPostOnDateList] = useState([]);
  const [HobbyList, setHobbyList] = useState("");
  const [OneXOneYList, setOneXOneYList] = useState([]);
  const [userPairsWithSharedHobbiesList, setUserPairsWithSharedHobbiesList] = useState([]);
  const [date, setDate] = useState(new Date('2022-04-13'));
  const [tagx, setTagx] = useState("X");
  const [tagy, setTagy] = useState("Y");
  const [blogSelection, setBlogSelection] = useState("hidden");
  const [postSuccess, setPostSuccess] = useState(false);
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
  

  //Change this to update automatic
  // const Initialize = async () => {
  //   const res = await fetch("http://localhost:4000/api/initialize", {
  //     method: "POST",
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //   })
  //   const data = await res.json();
  //   if(data.success) {
  //     console.log("initialize successful");
  //   } else {
  //     console.log("initialize failed");
  //   }
  // }

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
        setBlogLimit(data.blogs.slice(0,10));
        setBlogListALL(data.blogs);
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

        console.log("Showing hobbies fetched");
        console.log(data.hobbies);
        setUserHobbies(data.hobbies);
    }
  }

  const fetchpostNC = async () => {
    const res = await fetch("http://localhost:4000/api/blogsNC", {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    })
    const data = await res.json();
    if(data.blogs != null){
        console.log(data.blogs);
        setBlogListNC(data.blogs);
    }
  }

  const fetchpostMPR = async () => {
    const res = await fetch("http://localhost:4000/api/blogsMPR", {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    })
    const data = await res.json();
    if(data.blogs != null){
        console.log(data.blogs);
        setBlogListMPR(data.blogs);
    }
  }

  const fetchpostMNR = async () => {
    const res = await fetch("http://localhost:4000/api/blogsMNR", {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    })
    const data = await res.json();
    if(data.blogs != null){
        console.log(data.blogs);
        setBlogListMNR(data.blogs);
    }
  }

  const fetchpostOPR = async () => {
    const res = await fetch("http://localhost:4000/api/blogsOPR", {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    })
    const data = await res.json();
    if(data.blogs != null){
        console.log(data.blogs);
        setBlogListOPR(data.blogs);
    }
  }

  const fetchpostHobbies = async () => {
    const res = await fetch("http://localhost:4000/api/hobbyBlogs", {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    })
    const data = await res.json();
    if(data.blogs != null){
        console.log(data.blogs);
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
      const res = await fetch("http://localhost:4000/", {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },

      })
      const data = await res.json();
      console.log("This should stall until it fetches data...");
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
            {/* <Post postWindow = {postWindow} showPostWindow={setPostWindow} fetchpost={fetchpost}/> */}
            {/* <Post postWindow = {postWindow} showPostWindow={setPostWindow} fetchpost={fetchpost}/> */}
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
        {/* <div className="bottom-sidebar"><p>FOOTER</p></div> */}
        <div class="message" style={{display: alert}}>
          <div style={{margin: "0px"}}>
            <p>{message}</p>
          </div>
        </div>
      </div>
    );
}
  
export default UserPage;