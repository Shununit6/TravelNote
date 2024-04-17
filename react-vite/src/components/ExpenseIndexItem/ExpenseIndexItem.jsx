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
                    {/* <li>name: {currentexpense.name} amount: {currentexpense.amount} category: {currentexpense.category} split: {currentexpense.split}

                    <DeleteModal id="updateexpensedetails"
                                    itemText="Update Expense"
                                    modalComponent={<ExpenseForm formType="Update Expense" expense={currentexpense}/>}
                                    />
                    <DeleteModal id="deleteexpensedetails"
                                itemText="Delete Expense"
                                modalComponent={<DeleteExpenseModal expense={currentexpense}/>}
                                />
                    </li> */}
                    <table>
                    {/* <thead>
                        <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Category</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Most famous song</th>
                        </tr>
                    </thead> */}
                    <tbody>
                        <tr>
                        <th scope="row">{currentexpense.name}</th>
                        <td>{currentexpense.category}</td>
                        <td>{currentexpense.amount}</td>
                        <td><DeleteModal id="updateexpensedetails"
                                    itemText="Update Expense"
                                    modalComponent={<ExpenseForm formType="Update Expense" expense={currentexpense}/>}
                                    />
                    <DeleteModal id="deleteexpensedetails"
                                itemText="Delete Expense"
                                modalComponent={<DeleteExpenseModal expense={currentexpense}/>}
                                /></td>
                        </tr>
                    </tbody>
                    </table>
                </div>
            </div>
        /* </Link> */
        ))
    );
}

export default ExpenseIndexItem;
