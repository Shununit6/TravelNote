import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllStories } from '../../redux/stories';
import StoryIndexItem from '../StoryIndexItem';
import "./Stories.css";
import { getAllStoryimages } from '../../redux/storyimages';

function Stories() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const stories = useSelector((state) => state.stories);
    const storyimages = useSelector((state)=>state.storyimages);
    useEffect(()=>{
      dispatch(getAllStories()).then(()=>dispatch(getAllStoryimages())).then(()=>setIsLoaded(true))
    }, [dispatch]);

  if (!isLoaded) {
    return (<div>Loading...</div>);
  }
  // console.log(stories);
  if(isLoaded){
  return (
    <div id="storieslistgrid">
        <h2>
            {/* <Link id="eventsIsNotActive" to="/events" > Events </Link> */}
        <Link id="storiesIsActive" to="/stories" > Stories </Link>
        </h2>
         <div id="viewallstories">
            {Object.values(stories).map((story, index) => (
                  <StoryIndexItem story={story} storyimages={storyimages} key={index}/>
            ))}
         </div>
    </div>
  );}
}

export default Stories;
