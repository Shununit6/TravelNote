import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllPlaces } from '../../redux/places';
import PlaceIndexItem from '../PlaceIndexItem';
import "./Places.css";
import { getAllPlaceimages } from '../../redux/placeimages';

function Places() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
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
        <h2>
            {/* <Link id="eventsIsNotActive" to="/events" > Events </Link> */}
        <Link id="placesIsActive" to="/places" > Places </Link>
        </h2>
         <div id="viewallplaces">
            {places && Object.values(places).map((place, index) => (
                  <PlaceIndexItem place={place} placeimages={placeimages} key={index}/>
            ))}
         </div>
    </div>
  );}
}

export default Places;
