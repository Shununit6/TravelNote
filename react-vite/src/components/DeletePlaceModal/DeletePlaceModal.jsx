// import React, { useState } from "react";
// import * as sessionActions from "../../store/session";
import { useNavigate } from "react-router-dom"; //useParams,
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./DeletePlaceModal.css";
import { deletePlace } from "../../redux/places";

const DeletePlaceModal = ({place}) => {
    const placeId = place.id;
    // console.log("deletemodal", typeof(placeId), placeId);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    // const sessionUser = useSelector(state => state.session.user);
    // const [isLoaded, setIsLoaded] = useState(false);
    const handleDelete = async (e) => {
        e.preventDefault();
        await dispatch(deletePlace(placeId));
        closeModal();
        navigate(`/places`);
    };

    return (
        <div id="deleteplacemodal">
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to remove this place?</p>
            <button id="yesdeleteplace" onClick={handleDelete}> Yes (Delete Place) </button>
            <button id="nokeepplace" onClick={closeModal}> No (Keep Place) </button>
        </div>
    );
};

export default DeletePlaceModal;
