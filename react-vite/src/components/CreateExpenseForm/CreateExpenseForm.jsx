import ExpenseForm from "../ExpenseForm";

const CreateExpenseForm = () => {
  const expense = {
    name: '',
    category: '',
    amount: '',
    split:'',
    };

  /* **DO NOT CHANGE THE RETURN VALUE** */
  return (
    <ExpenseForm
      expense={expense}
      formType="Create Expense"
    />
  );
};

export default CreateExpenseForm;
