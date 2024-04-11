// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getExpenseDetails } from "../../redux/stories";
// import { Link } from 'react-router-dom';
import "./ExpenseIndexItem.css";

const ExpenseIndexItem = ({ expense }) => {
    // const dispatch = useDispatch();
    // const sessionUser = useSelector(state => state.session.user);
    // const { id, user_id, place_id, title, description, article_ url, shorts_url, created_at, updated_at} = story;
    // const { id, name} = expense;

    console.log(expense)
    console.log(expense[0].split)

    return (
        Object.values(expense).map((currentexpense, index) => (
        // <Link id="expenselinkwithtext" to={`/expenses/${expense.id}`} key={`${expense.id}`}>
            <div id="expensegrid1" key={`{index}${currentexpense.id}${currentexpense.plan_id}`}>
                <div id="expenseitem2">
                    <li>name: {currentexpense.name} amount: {currentexpense.amount} category: {currentexpense.category} split: {currentexpense.split}</li>
                </div>
            </div>
        /* </Link> */
        ))
    );
}

export default ExpenseIndexItem;
