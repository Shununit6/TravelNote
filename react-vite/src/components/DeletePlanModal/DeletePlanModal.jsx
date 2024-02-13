// import React, { useState } from "react";
// import * as sessionActions from "../../store/session";
import { useNavigate } from "react-router-dom"; //useParams,
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./DeletePlanModal.css";
import { deletePlan } from "../../redux/plans";

const DeletePlanModal = ({plan}) => {
    const planId = plan.id;
    // console.log("deletemodal", planId);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    // const sessionUser = useSelector(state => state.session.user);
    // const [isLoaded, setIsLoaded] = useState(false);
    const handleDelete = async (e) => {
        e.preventDefault();
        await dispatch(deletePlan(planId));
        closeModal();
        navigate(`/plans`);
    };

    return (
        <div id="deleteplanmodal">
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to remove this plan?</p>
            <button id="yesdeleteplan" onClick={handleDelete}> Yes (Delete Plan) </button>
            <button id="nokeepplan" onClick={closeModal}> No (Keep Plan) </button>
        </div>
    );
};

export default DeletePlanModal;
