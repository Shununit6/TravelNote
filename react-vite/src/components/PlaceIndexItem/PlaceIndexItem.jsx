// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getPlaceDetails } from "../../redux/places";
import { Link } from 'react-router-dom';
import "./PlaceIndexItem.css";
const PlaceIndexItem = ({ place }) => {
    // const dispatch = useDispatch();
    // const sessionUser = useSelector(state => state.session.user);
    // const { id, user_id, name, type, description, created_at, updated_at} = place;
    const { id, name} = place;

    return (
        <Link id="placelinkwithtext" to={`/places/${id}`} key={`${id}`}>
            <div id="placegrid1">
                {/* <div id="placeitem1">
                    <img id="placeExpenseImage" src={url} alt="placeExpenseImage" />
                </div> */}
                <div id="placeitem2">
                    {name}
                </div>
            </div>
        </Link>


    );
}

export default PlaceIndexItem;
