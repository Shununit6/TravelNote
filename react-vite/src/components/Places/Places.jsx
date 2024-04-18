import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllPlaces } from '../../redux/places';
import PlaceIndexItem from '../PlaceIndexItem';
import "./Places.css";
import { getAllPlaceimages } from '../../redux/placeimages';

function Places({num}) {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const sessionUser = useSelector(state => state.session.user);
    const places = useSelector((state) => state.places);
    const placeimages = useSelector((state)=>state.placeimages);
    useEffect(()=>{
      dispatch(getAllPlaces()).then(()=>dispatch(getAllPlaceimages())).then(()=>setIsLoaded(true))
    }, [dispatch]);

  if (!isLoaded) {
    return (<div>Loading...</div>);
  }
  // console.log(places);
  // console.log(placeimages)
  // const placeimageOne = Object.values(placeimages).filter((image)=> image.place_id == 1)[0].image_url;
  if(isLoaded){
  return (
    <div id="placeslistgrid">
        {num == 2 && <h2>
          <Link id="placesmainpage" to="/places" > Places </Link>
          {/* {sessionUser &&
          <div >
            <Link to="/places/current"><button>View my places</button></Link>
          </div>} */}
        </h2>}
        {num != 2 && <h2 id="switchplace">
          <Link id="plansIsNotActive" to="/plans" > Plans </Link>
          <Link id="placesIsActive" to="/places" > Places </Link>
          <Link id="storiesIsNotActive" to="/stories" > Stories </Link>
        </h2>}
        {
          num == 2 && <div id="viewallplaces">
          {places && Object.values(places).slice(0, 2).map((place, index) => (
                <PlaceIndexItem place={place} placeimages={placeimages} key={index}/>
          ))}
          </div>
        }
        {
          num != 2 && <div id="viewallplaces1">
          {places && Object.values(places).map((place, index) => (
                <PlaceIndexItem place={place} placeimages={placeimages} key={index}/>
          ))}
       </div>
        }
    </div>
  );}
}

export default Places;
