import { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { useSelector, useDispatch} from "react-redux";
import { getStoryDetails} from '../../redux/stories';
import { getAllLikes, getStoryLikes } from "../../redux/likes";
import "./StoryDetails.css";
import DeleteModal from "../DeleteModal";
import DeleteStoryModal from "../DeleteStoryModal";
import LikeStory from "../LikeStory";
import { getStoryimageDetails } from '../../redux/storyimages';
import noImg from '../../images/noimage.png';
// import DeleteImageModal from "../DeleteImageModal";
const StoryDetails = () => {
    const dispatch = useDispatch();
    let { storyId } = useParams();
    const sessionUser = useSelector(state => state.session.user);
    const [isLoaded, setIsLoaded] = useState(false);
    const storyData = useSelector((state) => state.stories[storyId]);
    const storyimageData = useSelector((state) => state.storyimages.storyImage);

    // useEffect(() => {
    //     dispatch(getStoryDetails(storyId)).then(()=>setIsLoaded(true))
    // }, [dispatch, storyId])
    useEffect(() => {
        dispatch(getStoryDetails(storyId)).then(()=>dispatch(getAllLikes()))
        .then(()=>dispatch(getStoryLikes(storyId))).then(()=>dispatch(getStoryimageDetails(storyId))).then(() => setIsLoaded(true));
      }, [dispatch, storyId]);
    if(isLoaded && !storyData){
        return (<Navigate to="/stories"/>);
    }
    if(!isLoaded) {
        return (<div>Loading...</div>);
    }
    // const { id, user_id, place_id, title, description, article_url, shorts_url, created_at, updated_at} = storyData;
    const { title, user_id, description, article_url, shorts_url} = storyData;

    let isStoryCreator=false;
    if(sessionUser && storyData && user_id === sessionUser.id){
        isStoryCreator=true;
    }

    let storyimageurl = Object.values(storyimageData);
    if(!storyimageurl || !storyimageurl.length){
        storyimageurl = noImg;
    }

    if(isLoaded){
        return(
            <div id="items">
                {/* <div id="items-2"></div> */}
                <div id="item1">
                    <Link id="storytext" to={"/stories"}> <p>Stories</p> </Link>
                </div>
                {/* <div id="item2">
                    <img id="images" src={imageUrl} alt="story"/>
                </div> */}
                <div id="item2">
                {storyimageurl == noImg && <img id="nostoryimages" src={storyimageurl} alt="storyimage"/>}
                {storyimageurl != noImg && (storyimageurl).map((image, index) => (
                  <img className={`storyimageitem${index}`} src={image.image_url} alt="storyimage" key={index}/>
                ))}
                </div>
                <div id="item3">
                    <h1>{title}</h1>
                    {sessionUser && <LikeStory userId={user_id} storyId={storyId}/>}
                    <p>{description}</p>
                    {/* <p>{article_url}</p> */}
                    <a target='_blank' rel='noopener noreferrer' href={article_url}>Read Original Content</a>
                    <p>Available URL of Shorts: {shorts_url}</p>
                </div>
                    {sessionUser && isStoryCreator ?
                        <div id="item4" className="buttons-container">
                        <Link to={`/stories/${storyId}/edit`}>
                            <button id="updatestorydetails" >Update My Story</button>
                        </Link>
                        <DeleteModal id="deletedstorydetails"
                                itemText="Delete My Story"
                                modalComponent={<DeleteStoryModal story={storyData}/>}
                                />
                        </div>
                        : null}
                    {/* {sessionUser && <LikeStory userId={user_id} storyId={storyId}/>} */}
            </div>
        );
    }

};

export default StoryDetails;
