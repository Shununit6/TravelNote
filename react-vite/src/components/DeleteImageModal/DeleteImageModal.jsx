// import React, { useState } from "react";
// import * as sessionActions from "../../store/session";
import { useNavigate } from "react-router-dom"; //useParams,
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./DeleteImageModal.css";
import { deletePlaceimage } from "../../redux/placeimages";

const DeleteImageModal = ({image}) => {
    const imageId = image.id;
    const placeId = image.place_id;
    // console.log("deletemodal", imageId);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    // const sessionUser = useSelector(state => state.session.user);
    // const [isLoaded, setIsLoaded] = useState(false);
    const handleDelete = async (e) => {
        e.preventDefault();
        await dispatch(deletePlaceimage(imageId));
        closeModal();
        navigate(`/places`);
    };

    return (
        <div id="deleteplanmodal">
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to remove this image?</p>
            <button id="yesdeleteimage" onClick={handleDelete}> Yes (Delete Image) </button>
            <button id="nokeepimage" onClick={closeModal}> No (Keep Image) </button>
        </div>
    );
};

export default DeleteImageModal;
