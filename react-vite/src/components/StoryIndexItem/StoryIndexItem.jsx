// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getStoryDetails } from "../../redux/stories";
import { Link } from 'react-router-dom';
import "./StoryIndexItem.css";
import noImg from '../../images/noimage.png';
const StoryIndexItem = ({ story, storyimages }) => {
    // const dispatch = useDispatch();
    // const sessionUser = useSelector(state => state.session.user);
    // const { id, user_id, place_id, title, description, article_ url, shorts_url, created_at, updated_at} = story;
    const { id, title} = story;
    let storyimageurl;
    if(storyimages){
        storyimageurl = Object.values(storyimages).filter((image)=> image.story_id == id);
    }
    if(storyimageurl && storyimageurl.length){
        // console.log(storyimageurl[0].image_url)
        storyimageurl = storyimageurl[0].image_url;
    }else{
        storyimageurl = noImg;
    }

    return (
        <Link id="storylinkwithtext" to={`/stories/${id}`} key={`${id}`}>
            <div id="storygrid1">
                <div id="storyitem1">
                    <img id="storyImage" src={storyimageurl} alt="storyImage" />
                </div>
                <div id="storyitem2">
                    {title}
                </div>
            </div>
        </Link>


    );
}

export default StoryIndexItem;
