import { useState, useEffect } from "react";
import { useNavigate} from "react-router-dom"; //useParams,
import { useDispatch, useSelector} from "react-redux"; //useSelector
import { createExpense, updateExpense } from "../../redux/expenses";
import "./ExpenseForm.css";
import { useModal } from "../../context/Modal";

const ExpenseForm = ({ expense, formType }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const sessionUser = useSelector(state => state.session.user);
    const expenses = useSelector(state => state.expenses);
    let [name, setName] = useState(expense?.name);
    let [category, setCategory] = useState(expense?.category);
    let [amount, setAmount] = useState(expense?.amount);
    let userId = sessionUser.id;
    let splitState;
    const { closeModal } = useModal();

    if(expense?.split == true){
        splitState="Split with everyone";
    }else if(expense?.split == false){
        splitState="Do not split";
    }else{
        splitState="";
    }
    let [split, setSplit] = useState(splitState);

    let isUpdate = false;
    if(formType == "Update Expense"){
        isUpdate = true;
    }

    const [validationErrors, setValidationErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);
    console.log(expense);
    console.log(userId);

    useEffect(() => {
        const errors = { name:[], category: [], amount:[], split:[]};
        if (!name.length) errors["name"].push("Name is required");
        if (name.length > 60) errors["name"].push("Name must be 60 characters or less");
        if (!category.length) errors["category"].push("Category is required");
        if (!amount.length) errors["amount"].push("Amount is required");
        if (!split.length) errors["split"].push("Split is required");

        setValidationErrors(errors);
    }, [name, category, amount, split]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);

        if(split === "Split with everyone"){
            split = 1;
        }else{
            split = 0;
        }

        expense = { ...expense, name, category, amount, split};

        let newExpense;
        console.log("validationErrorsvalidationErrors", validationErrors);
        let errorCount = validationErrors.name.length + validationErrors.category.length
        + validationErrors.amount.length + validationErrors.split.length;
        // console.log(errorCount);
        if (errorCount > 0){
            // console.log("has errors");
            }else{
                // console.log("no errors");
                if (formType === "Update Expense") {
                    console.log("before", expense)
                    newExpense = await dispatch(updateExpense(expense));
                    console.log("after", newExpense)
                } else {
                    newExpense = await dispatch(createExpense(expense));
                }
                if (newExpense.id) {
                    // console.log("newExpense.id", newExpense.id);
                    closeModal();
                    navigate(`/plans/${newExpense.plan_id}`);
                } else {
                    const { validationErrors } = await newExpense.json();
                    setValidationErrors(validationErrors);
                }
                // console.log(newExpense);

                setName('');
                setCategory('');
                setAmount('');
                setSplit('');
                setValidationErrors({});
                setHasSubmitted(false);
            }
    };

//     /* **DO NOT CHANGE THE RETURN VALUE** */
    return (
        <form onSubmit={handleSubmit}>
            {/* {console.log(validationErrors)} */}
            <div id="expenseformcreateupdate">
                <div id="titlecreateupdateexpenseform">
                    {!isUpdate && <h2>Start a New Expense</h2>}
                    {isUpdate && <h2>Update your Expense</h2>}
                </div>
            <div>
                <label>
                    What is the name of this expense?
                    <input
                        id='expenseformname'
                        type="text"
                        placeholder="What is your expense name?"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                    {hasSubmitted &&
                        validationErrors.name.length > 0 &&
                        validationErrors.name.map((error, idx) => (
                            <div key={idx}>
                                <p className="error">{error}</p>
                            </div>
                        ))}
                </label>
            </div>
            <div>
                <label>
                    What kind of expense is this?
                    <select id="expenseformcategory" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="select one">
                        <option value='' disabled>(select one)</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Food">Food</option>
                        <option value="Lodging">Lodging</option>
                        <option value="Transportation">Transportation</option>
                        <option value="Other">Other</option>
                    </select>
                    {hasSubmitted &&
                        validationErrors.category.length > 0 &&
                        validationErrors.category.map((error, idx) => (
                            <div key={idx}>
                                <p className="error">{error}</p>
                            </div>
                        ))}
                </label>
            </div>
            <div>
                <label>
                    What is the amount of this expense?
                    <input
                            id='expenseformamount'
                            type="number"
                            min="1"
                            value={amount}
                            placeholder="Please enter a number larger than 0"
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    {hasSubmitted &&
                        validationErrors.amount.length > 0 &&
                        validationErrors.amount.map((error, idx) => (
                            <div key={idx}>
                                <p className="error">{error}</p>
                            </div>
                        ))}
                </label>
            </div>
            <div>
                 <label>
                    Would you like to split this expense with others?
                    <select id="planformprivate" value={split} onChange={(e) => setSplit(e.target.value)}>
                            <option value="Split with everyone">Split with everyone</option>
                            <option value="Do not split">Do not split</option>
                    </select>
                    {hasSubmitted &&
                        validationErrors.split.length > 0 &&
                        validationErrors.split.map((error, idx) => (
                            <div key={idx}>
                                <p className="error">{error}</p>
                            </div>
                        ))}
                 </label>
            </div>
            <button type="submit" id="ExpenseCreateUpdateButton" >{formType}</button>
            </div>
        </form>
    );
};

export default ExpenseForm;
