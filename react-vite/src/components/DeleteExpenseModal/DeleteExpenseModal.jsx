// import React, { useState } from "react";
// import * as sessionActions from "../../store/session";
import { useNavigate } from "react-router-dom"; //useParams,
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./DeleteStoryModal.css";
import { deleteExpense } from "../../redux/expenses";

const DeleteStoryModal = ({expense}) => {
    const expenseId = expense.id;
    // console.log("deletemodal", typeof(storyId), storyId);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    // const sessionUser = useSelector(state => state.session.user);
    // const [isLoaded, setIsLoaded] = useState(false);
    const handleDelete = async (e) => {
        e.preventDefault();
        await dispatch(deleteStory(expenseId));
        closeModal();
        navigate(`/expenses`);
    };

    return (
        <div id="deletestorymodal">
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to remove this expense?</p>
            <button id="yesdeleteexpense" onClick={handleDelete}> Yes (Delete Expense) </button>
            <button id="nokeepexpense" onClick={closeModal}> No (Keep Expense) </button>
        </div>
    );
};

export default DeleteExpenseModal;
