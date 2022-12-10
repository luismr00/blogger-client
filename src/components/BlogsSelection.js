import React, { useEffect, useState } from "react";
import Close from "../assets/close.svg";

function BlogSelection(props) {

    const [blogSelection, setBlogSelection] = useState("blogsALL");

    const changeBlogList = () => {
        console.log("changing blogList to: " + blogSelection);

        if(blogSelection === "blogsALL") {

            props.setBlogList(props.BlogListALL);
            props.setBlogLimit(props.BlogListALL.slice(0,10));

        } else if(blogSelection === "blogsNC") {

            props.setBlogList(props.BlogListNC); 
            props.setBlogLimit(props.BlogListNC.slice(0,10));

        } else if(blogSelection === "blogsMPR") {

            props.setBlogList(props.BlogListMPR);
            props.setBlogLimit(props.BlogListMPR.slice(0,10));

        } else if(blogSelection === "blogsMNR") {

            props.setBlogList(props.BlogListMNR);
            props.setBlogLimit(props.BlogListMNR.slice(0,10));

        } else if(blogSelection === "blogsOPR") {

            props.setBlogList(props.BlogListOPR);
            props.setBlogLimit(props.BlogListOPR.slice(0,10));

        } else if(blogSelection === "hobbyBlogs") {

            props.setBlogList(props.BlogListHobbies);
            props.setBlogLimit(props.BlogListHobbies.slice(0,10));

        }
            
        //CLOSE BLOGSELECTION WINDOW
        props.setBlogSelection("hidden");
    }

    return (
        <div className="blog-switch" style={{visibility: props.blogSelection}}>
            {/* <img className="close" src={Close} onClick={() => props.showPostWindow("hidden")}></img> */}
            <div className="close-selection">
                <img className="close" src={Close} onClick={() => props.setBlogSelection("hidden")}></img>
            </div>
            <div className="blog-switch-body">
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value="blogsALL" onChange={(e)=>setBlogSelection(e.target.value)} defaultChecked ></input>
                    <label class="form-check-label" for="flexRadioDefault1">
                        Show ALL blogs
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value="blogsNC" onChange={(e)=>setBlogSelection(e.target.value)}></input>
                    <label class="form-check-label" for="flexRadioDefault2">
                        Show blogs with no comments
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value="blogsMPR" onChange={(e)=>setBlogSelection(e.target.value)}></input>
                    <label class="form-check-label" for="flexRadioDefault1">
                        Show blogs with more positive than negative comments
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value="blogsMNR" onChange={(e)=>setBlogSelection(e.target.value)}></input>
                    <label class="form-check-label" for="flexRadioDefault1">
                        Show blogs with more negative than positive comments
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value="blogsOPR" onChange={(e)=>setBlogSelection(e.target.value)}></input>
                    <label class="form-check-label" for="flexRadioDefault1">
                        Show blogs with ONLY positive comments
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value="hobbyBlogs" onChange={(e)=>setBlogSelection(e.target.value)}></input>
                    <label class="form-check-label" for="flexRadioDefault1">
                        Show blogs that share similar hobbies
                    </label>
                </div>
                {/* <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" checked={status}></input>
                <label class="form-check-label" for="flexSwitchCheckDefault">Show all blogs</label>
                </div>
                <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" disabled={true}></input>
                <label class="form-check-label" for="flexSwitchCheckDefault">Show blogs with no comments</label>
                </div>
                <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked"></input>
                <label class="form-check-label" for="flexSwitchCheckChecked">Show blogs with more positive than negative comments</label>
                </div>
                <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="flexSwitchCheckDisabled"></input>
                <label class="form-check-label" for="flexSwitchCheckDisabled">Show blogs with more negative than positive comments</label>
                </div>
                <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="flexSwitchCheckCheckedDisabled"></input>
                <label class="form-check-label" for="flexSwitchCheckCheckedDisabled">Show blogs with ONLY positive comments</label>
                </div>
                <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="flexSwitchCheckCheckedDisabled"></input>
                <label class="form-check-label" for="flexSwitchCheckCheckedDisabled">Show blogs that share similar hobbies</label>
                </div> */}
                <div className="center-button">
                    <button className="save-button" onClick={()=>changeBlogList()}>Save</button>
                </div>
            </div>
        </div>
    );

}

export default BlogSelection;