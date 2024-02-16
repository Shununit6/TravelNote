import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllStories } from '../../redux/stories';
import StoryIndexItem from '../StoryIndexItem';
import "./Stories.css";

function Stories() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const stories = useSelector((state) => state.stories);
    useEffect(()=>{
      dispatch(getAllStories()).then(()=>setIsLoaded(true))
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
         <p>All Trip Stories</p>
         <div id="viewallstories">
            {Object.values(stories).map((story, index) => (
                  <StoryIndexItem story={story} key={index}/>
            ))}
         </div>
    </div>
  );}
}

export default Stories;
