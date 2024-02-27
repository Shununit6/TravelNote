import './ManagePlaces.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPlaces } from '../../redux/places';
import PlaceIndexItem from '../PlaceIndexItem';
// import MenuLibrary from '../MenuLibrary';
import { getAllPlaceimages } from '../../redux/placeimages';

const ManagePlaces = () => {
    const dispatch = useDispatch();
    const places = useSelector((state) => Object.values(state.places));
    const placeimages = useSelector((state)=>state.placeimages);
    const [isLoading, setIsLoading] = useState(true);
    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        if (sessionUser) {
            dispatch(getAllPlaces()).then(()=>dispatch(getAllPlaceimages())).then(() => setIsLoading(false));
        }
    }, [dispatch, sessionUser]);

    if (isLoading) return <>Loading...</>;


    const placesByUser = places ? places.filter(place => {
        return place.user_id === sessionUser?.id;
    }) : [];

    // console.log("placesByUser:", placesByUser);

    const hasPlaces = placesByUser.length > 0;

    return (
        <div className='managePlacewrapper'>
            {/* <div className='managePlaceitem-1'>
                <MenuLibrary />
            </div> */}
            <div className='managePlaceitem-2'>
            <p className='title'>Manage My Places</p>
            {!hasPlaces && <Link to={'/places/new'}><button className='createPlaceButton'>Create a New Place</button></Link>}
            {hasPlaces && <ul className='managePlaceIndex'>
                {placesByUser.map((place) => (
                    <ul className='manageEachPlace' key={String(place.id)}>
                        {place && <PlaceIndexItem place={place} placeimages={placeimages}/>}
                    </ul>
                ))}
             </ul>}
            </div>
        </div>
    );
};

export default ManagePlaces;
