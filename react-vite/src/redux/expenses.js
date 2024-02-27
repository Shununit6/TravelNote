// /** Action Type Constants: */
export const LOAD_EXPENSES = "expenses/LOAD_EXPENSES";
export const LOAD_EXPENSE_DETAILS = "expenses/LOAD_EXPENSE_DETAILS";
export const RECEIVE_EXPENSE = "expenses/RECEIVE_EXPENSE";
export const UPDATE_EXPENSE = "expenses/UPDATE_EXPENSE";
export const REMOVE_EXPENSE = "expenses/REMOVE_EXPENSE";

// /**  Action Creators: */
export const loadExpenses = (expenses) => ({
    type: LOAD_EXPENSES,
    expenses,
});

export const loadExpenseDetails = (expense) => ({
    type: LOAD_EXPENSE_DETAILS,
    expense,
});

export const receiveExpense = (expense) => ({
    type: RECEIVE_EXPENSE,
    expense,
});

export const editExpense = (expense) => ({
    type: UPDATE_EXPENSE,
    expense,
});

export const removeExpense = (expense) => ({
    type: REMOVE_EXPENSE,
    expense,
});

// /** Thunk Action Creators: */
export const getAllExpenses = () => async (dispatch) => {
    const res = await fetch(`/api/expenses`);

    if (res.ok) {
        const data = await res.json();
        // console.log("data", data);
        dispatch(loadExpenses(data));
        return data;
    }
    return res;
};

export const getExpenseDetails = (expenseId) => async dispatch => {
    // console.log("Fetching expense details for expenseId:", expenseId);
    const res = await fetch(`/api/expenses/${expenseId}`);

    if (res.ok) {
        const data = await res.json();
        // console.log("Received data:", data);
        dispatch(loadExpenseDetails(data));
        return data;
    }
    // console.log("Error fetching expense details:", res.statusText);
    return res;
};

export const getMyExpense = () => async (dispatch) => {
    const res = await fetch('/api/expenses/current');
    if (res.ok) {
        const data = await res.json();
        dispatch(loadExpenses(data));
        return data;
    }
    return res;
};

export const createExpense = (payload) => async (dispatch) => {
    const res = await fetch("/api/expenses/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(receiveExpense(data));
        return data;
    }
    return res;
};

export const updateExpense = (expense) => async (dispatch) => {
    const res = await fetch(`/api/expenses/${expense.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(expense),
    });
    if (res.ok) {
        const data = await res.json();
        dispatch(editExpense(data));
        return data;
    }
    return res;
};

export const deleteExpense = (expenseId) => async (dispatch) => {
    const res = await fetch(`/api/expenses/${expenseId}`, {
        method: "DELETE",
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(removeExpense(expenseId));
        return data;
    }
    return res;
};

const expensesReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_EXPENSES: {
            const expensesState = { ...state };
            action.expenses.expenses.forEach((expense) => {
                if (!expensesState[expense.id]) { expensesState[expense.id] = expense; }
            });
            return {...expensesState};
        }
        case LOAD_EXPENSE_DETAILS: {
            return { ...state, [action.expense.id]: action.expense };
        }
        case RECEIVE_EXPENSE:
            return { ...state, [action.expense.id]: action.expense };
        case UPDATE_EXPENSE:
            return { ...state };
        case REMOVE_EXPENSE: {
            const expenseState = { ...state };
            delete expenseState[action.expense];
            return {...expenseState};
        }
        default:
            return { ...state };
    }
};

export default expensesReducer;
