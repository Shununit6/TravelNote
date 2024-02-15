import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllPlaces } from '../../redux/places';
import PlaceIndexItem from '../PlaceIndexItem';
import "./Places.css";

function Places() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const places = useSelector((state) => state.places);
    useEffect(()=>{
      dispatch(getAllPlaces()).then(()=>setIsLoaded(true))
    }, [dispatch]);

  if (!isLoaded) {
    return (<div>Loading...</div>);
  }
  // console.log(places);
  if(isLoaded){
  return (
    <div id="placeslistgrid">
        <h2>
            {/* <Link id="eventsIsNotActive" to="/events" > Events </Link> */}
        <Link id="placesIsActive" to="/places" > Places </Link>
        </h2>
         <p>All Trip Places</p>
         <div id="viewallplaces">
            {places && Object.values(places).map((place, index) => (
                  <PlaceIndexItem place={place} key={index}/>
            ))}
         </div>
    </div>
  );}
}

export default Places;
