// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getExpenseDetails } from "../../redux/stories";
import { Link } from 'react-router-dom';
import "./ExpenseIndexItem.css";

const ExpenseIndexItem = ({ expense }) => {
    // const dispatch = useDispatch();
    // const sessionUser = useSelector(state => state.session.user);
    // const { id, user_id, place_id, title, description, article_ url, shorts_url, created_at, updated_at} = story;
    // const { id, name} = expense;

    console.log(expense)

    return (
        Object.values(expense).map((expense, index) => (
        <Link id="expenselinkwithtext" to={`/expenses/${id}`} key={`${id}`}>
            <div id="expensegrid1">
                <div id="expenseitem2">
                    {expense.name}
                </div>
            </div>
        </Link>))
    );
}

export default ExpenseIndexItem;
