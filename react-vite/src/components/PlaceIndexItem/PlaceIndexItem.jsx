// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getPlaceDetails } from "../../redux/places";
import { Link } from 'react-router-dom';
import "./PlaceIndexItem.css";
import noImg from '../../images/noimage.png';
const PlaceIndexItem = ({ place, placeimages }) => {
    // const dispatch = useDispatch();
    // const sessionUser = useSelector(state => state.session.user);
    // const { id, user_id, name, type, description, created_at, updated_at} = place;
    const { id, name} = place;
    let placeimageurl;
    if(placeimages){
        placeimageurl = Object.values(placeimages).filter((image)=> image.place_id == id);
    }
    if(placeimageurl && placeimageurl.length){
        // console.log(placeimageurl[0].image_url)
        placeimageurl = placeimageurl[0].image_url;
    }else{
        placeimageurl = noImg;
    }
    return (
        <Link id="placelinkwithtext" to={`/places/${id}`} key={`${id}`}>
            <div id="placegrid1">
                {/* <div id="placeitem1">
                    <img id="placeExpenseImage" src={url} alt="placeExpenseImage" />
                </div> */}
                <div id="placeitem1">
                    <img id="placeImage" src={placeimageurl} alt="placeImage" />
                </div>
                <div id="placeitem2">
                    {name}
                </div>
            </div>
        </Link>


    );
}

export default PlaceIndexItem;
