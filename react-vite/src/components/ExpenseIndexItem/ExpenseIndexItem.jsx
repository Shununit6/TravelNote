// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getExpenseDetails } from "../../redux/stories";
// import { Link } from 'react-router-dom';
import "./ExpenseIndexItem.css";
import DeleteModal from "../DeleteModal";
import ExpenseForm from "../ExpenseForm/ExpenseForm";
import DeleteExpenseModal from "../DeleteExpenseModal";

const ExpenseIndexItem = ({ expense }) => {
    // const dispatch = useDispatch();
    // const sessionUser = useSelector(state => state.session.user);
    // const { id, user_id, place_id, title, description, article_ url, shorts_url, created_at, updated_at} = story;
    // const { id, name} = expense;

    console.log(expense)
    console.log(expense[0].split)

    return (
        Object.values(expense).map((currentexpense) => (
        // <Link id="expenselinkwithtext" to={`/expenses/${expense.id}`} key={`${expense.id}`}>
            <div id="expensegrid1" key={`${currentexpense.id}${currentexpense.plan_id}`}>
                <div id="expenseitem2">
                    <li>name: {currentexpense.name} amount: {currentexpense.amount} category: {currentexpense.category} split: {currentexpense.split}

                    <DeleteModal id="updateexpensedetails"
                                    itemText="Update Expense"
                                    modalComponent={<ExpenseForm formType="Update Expense" expense={currentexpense}/>}
                                    />
                    <DeleteModal id="deleteexpensedetails"
                                itemText="Delete Expense"
                                modalComponent={<DeleteExpenseModal expense={currentexpense}/>}
                                />
                    </li>
                </div>
            </div>
        /* </Link> */
        ))
    );
}

export default ExpenseIndexItem;
