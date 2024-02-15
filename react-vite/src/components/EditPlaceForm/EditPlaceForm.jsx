import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getPlaceDetails } from "../../redux/places";
import { useEffect } from "react";
import PlaceForm from "../PlaceForm";

const EditPlaceForm = () => {
    const dispatch = useDispatch();
    const { placeId } = useParams();
    const place = useSelector((state) => state.places[placeId]);

    useEffect(() => {
        dispatch(getPlaceDetails(placeId));
    }, [dispatch, placeId]);

    if (!place) return <></>;

    /* **DO NOT CHANGE THE RETURN VALUE** */
    return (
        Object.keys(place).length > 0 && (
            <>
                <PlaceForm place={place} formType="Update Place" />
            </>
        )
    );
};

export default EditPlaceForm;
