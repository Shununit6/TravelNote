import { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { useSelector, useDispatch} from "react-redux";
import { getPlaceDetails} from '../../redux/places';
import "./placeDetails.css";
import DeleteTheModal from "../DeleteTheModal";
import DeletePlaceModal from "../DeletePlaceModal";
const PlaceDetails = () => {
    const dispatch = useDispatch();
    let { placeId } = useParams();
    const sessionUser = useSelector(state => state.session.user);
    const [isLoaded, setIsLoaded] = useState(false);
    const placeData = useSelector((state) => state.places[placeId]);

    useEffect(() => {
        dispatch(getPlaceDetails(placeId)).then(()=>setIsLoaded(true))
    }, [dispatch, placeId])
    if(isLoaded && !placeData){
        return (<Navigate to="/places"/>);
    }
    if(!isLoaded) {
        return (<div>Loading...</div>);
    }
    // const { id, user_id, name, number_traveler, city, country, start_date, end_date, created_at, updated_at} = planData;
    const { user_id, name, type, description } = placeData;
    let isPlaceCreator=false;
    if(sessionUser && placeData && user_id === sessionUser.id){
        isPlaceCreator=true;
    }

    if(isLoaded){
        return(
            <div id="items">
                {/* <div id="items-2"></div> */}
                <div id="item1">
                    <Link to={"/places"}> <p>Places</p> </Link>
                </div>
                {/* <div id="item2">
                    <img id="images" src={imageUrl} alt="place"/>
                </div> */}
                <div id="item3">
                    <h1>{name}</h1>
                    <p>{type}</p>
                    <p>{description}</p>
                </div>
                    {sessionUser && isPlaceCreator ?
                        <div id="item4" className="buttons-container">
                        <Link to={`/places/${placeId}/edit`}>
                            <button id="updateplacedetails" >Update</button>
                        </Link>
                        <DeleteTheModal id="deleteplacedetails"
                                itemText="Delete"
                                modalComponent={<DeletePlaceModal place={placeData}/>}
                                />
                        </div>
                        : null}
            </div>
        );
    }

};

export default PlaceDetails;
