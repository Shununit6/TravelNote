import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getExpenseDetails } from "../../redux/plans";
import { useEffect } from "react";
import ExpenseForm from "../ExpenseForm";

const EditExpenseForm = () => {
    const dispatch = useDispatch();
    const { expenseId } = useParams();
    // const plan = useSelector((state) => state.plans[planId]);
    const expense = useSelector((state) => state.expenses[expenseId]);

    useEffect(() => {
        dispatch(getExpenseDetails(expenseId));
    }, [dispatch, expenseId]);

    if (!expense) return <></>;

    /* **DO NOT CHANGE THE RETURN VALUE** */
    return (
        Object.keys(expense).length > 0 && (
            <>
                <ExpenseForm expense={expense} formType="Update Expense" />
            </>
        )
    );
};

export default EditExpenseForm;
