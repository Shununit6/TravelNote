// import React, { useState } from "react";
// import * as sessionActions from "../../store/session";
import { useNavigate } from "react-router-dom"; //useParams,
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./DeletestoryModal.css";
import { deleteStory } from "../../redux/stories";

const DeleteStoryModal = ({story}) => {
    const storyId = story.id;
    // console.log("deletemodal", typeof(storyId), storyId);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    // const sessionUser = useSelector(state => state.session.user);
    // const [isLoaded, setIsLoaded] = useState(false);
    const handleDelete = async (e) => {
        e.preventDefault();
        await dispatch(deleteStory(storyId));
        closeModal();
        navigate(`/stories`);
    };

    return (
        <div id="deletestorymodal">
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to remove this story?</p>
            <button id="yesdeletestory" onClick={handleDelete}> Yes (Delete Story) </button>
            <button id="nokeepstory" onClick={closeModal}> No (Keep Story) </button>
        </div>
    );
};

export default DeleteStoryModal;
