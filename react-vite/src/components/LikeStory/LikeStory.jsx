import './LikeStory.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStoryLikes, getAllLikes, createLike, deleteLike } from '../../redux/likes';
import { getStoryDetails } from '../../redux/stories';

function LikeStory({storyId, userId}) {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const sessionUser = useSelector(state => state.session.user);
    storyId = parseInt(storyId);
    // const likes = useSelector(state => state.likesReducer.likes);
    const alllikes = useSelector(state => state.likes);
    const numofl=  Object.values(alllikes).filter((curr)=> (curr.story_id == storyId)).length;

    let currLike = Object.values(alllikes).filter((curr)=> (curr.story_id == storyId && curr.user_id == sessionUser.id));
    // console.log("currLike", currLike);
    // .filter((curr)=> (curr.story_id == storyId));

    const[isliked, setIsLiked] = useState(currLike.length==true);

    useEffect(() => {
      dispatch(getStoryDetails(storyId)).then(()=>dispatch(getAllLikes())).then(()=>dispatch(getStoryLikes(storyId))).then(() => setIsLoading(false));
    }, [dispatch, storyId]);

  if (isLoading) return (<>Loading...</>);


  const handleClick = () => {
      if(isliked == 1 ){
      let likeId;
      if(currLike.length){
        likeId = currLike[0].id;
      }

      dispatch(deleteLike(likeId, storyId))

    }
    if(isliked == 0)
    {

    const addlike = {"user_id" : userId,
      "story_id" : storyId };
    dispatch(createLike(addlike, storyId))

    }
    setIsLiked(!isliked);
  };


  if(!isliked){
    return (
      <>
        {/* <button onClick={handleClick}>like</button> */}
        <div id="regularlike" onClick={handleClick}><i className="fa-regular fa-heart"></i></div>
        <div>{numofl} liked this story</div>
      </>
        )
  }else{
    return (
      <>
        {/* <button onClick={handleClick}>unlike</button> */}
        <div id="solidlike" onClick={handleClick}><i className="fa-solid fa-heart"></i></div>
        <div>{numofl} liked this story</div>
      </>
    )
  }

}

export default LikeStory;
