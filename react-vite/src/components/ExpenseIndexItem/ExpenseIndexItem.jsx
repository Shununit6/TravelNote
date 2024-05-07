// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getExpenseDetails } from "../../redux/stories";
// import { Link } from 'react-router-dom';
import "./ExpenseIndexItem.css";
import DeleteModal from "../DeleteModal";
import ExpenseForm from "../ExpenseForm/ExpenseForm";
import DeleteExpenseModal from "../DeleteExpenseModal";

const ExpenseIndexItem = ({ expense }) => {
    return (
        Object.values(expense).map((currentexpense) => (
            <div id="expensegrid1" key={`${currentexpense.id}${currentexpense.plan_id}`}>
                <div id="expenseitem2">
                    <table>
                    <tbody>
                        <tr>
                        <th scope="row"> {currentexpense.name}</th>
                        <td> {currentexpense.category}</td>
                        <td> {currentexpense.amount}</td>
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
        ))
    );
}

export default ExpenseIndexItem;
