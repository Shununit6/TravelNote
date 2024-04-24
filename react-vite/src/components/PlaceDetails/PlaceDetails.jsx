import { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { useSelector, useDispatch} from "react-redux";
import { getPlaceDetails} from '../../redux/places';
import "./PlaceDetails.css";
import DeleteModal from "../DeleteModal";
import DeletePlaceModal from "../DeletePlaceModal";
import { getPlaceimageDetails } from "../../redux/placeimages";
import noImg from '../../images/noimage.png';
// import DeleteImageModal from "../DeleteImageModal";
import PlaceForm from "../PlaceForm/PlaceForm";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
const PlaceDetails = () => {
    const dispatch = useDispatch();
    let { placeId } = useParams();
    const sessionUser = useSelector(state => state.session.user);
    const [isLoaded, setIsLoaded] = useState(false);
    const placeData = useSelector((state) => state.places[placeId]);
    const placeimageData = useSelector((state) => state.placeimages.placeImage);
    useEffect(() => {
        dispatch(getPlaceDetails(placeId)).then(()=>dispatch(getPlaceimageDetails(placeId))).then(()=>setIsLoaded(true))
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

    let placeimageurl = Object.values(placeimageData);
    if(!placeimageurl || !placeimageurl.length){
        placeimageurl = noImg;
    }
    // console.log("placeimageurl", placeimageurl)

    if(isLoaded){
        return(
            <div id="items">
                {/* <div id="items-2"></div> */}
                <div id="item1">
                    <Link id="placetext" to={"/places"}> <p>Places</p> </Link>
                </div>
                <div id="item2">
                {placeimageurl == noImg && <img id="noplaceimages" src={placeimageurl} alt="placeimage"/>}
                {/* {sessionUser && isPlaceCreator && placeimageurl == noImg && <button className={"firstimage"} >Add Image</button>} */}
                {/* {placeimageurl != noImg && <img id="images" src={} alt="place"/>} */}
                {/* {placeimageurl != noImg && (placeimageurl).map((image, index) => (
                  <img className={`placeimageitem${index}`} src={image.image_url} alt="placeimage" key={index}/>
                ))} */}
                {placeimageurl != noImg &&
                <Carousel useKeyboardArrows={true}>
                    {placeimageurl.map((URL, index) => (
                    <div className="slide">
                        <img alt="sample_file" src={URL.image_url} key={index} />
                    </div>
                    ))}
                </Carousel>}
                {/* {sessionUser && isPlaceCreator ? placeimageurl != noImg && (placeimageurl).map((image, index) => (
                  <button key={index} className={`placeimageitemupdate${index}`} >Update Image</button>
                )):null} */}
                {/* {sessionUser && isPlaceCreator ? placeimageurl != noImg && (placeimageurl).map((image, index) => (
                  <DeleteModal key={index} id={`placeimageitemdelete${index}`}
                  itemText="Delete Image"
                  modalComponent={<DeleteImageModal image={image}/>}
                  />
                )):null} */}
                {/* <img id="images" src={placeimageurl} alt="place"/> */}
                </div>
                <div id="item3">
                    <h1>{name}</h1>
                    <p>{type}</p>
                    <p>{description}</p>
                </div>
                    {sessionUser && isPlaceCreator ?
                        <div id="item4" className="buttons-container">
                        {/* <Link to={`/places/${placeId}/edit`}>
                            <button id="updateplacedetails" >Update</button>
                        </Link> */}
                        <div><DeleteModal id="updateplacedetails"
                                    itemText="Update Place"
                                    modalComponent={<PlaceForm formType="Update Place" place={placeData}/>}
                                    />
                        </div>
                        <DeleteModal id="deleteplacedetails"
                                itemText="Delete Place"
                                modalComponent={<DeletePlaceModal place={placeData}/>}
                                />
                        </div>
                        : null}
            </div>
        );
    }

};

export default PlaceDetails;
