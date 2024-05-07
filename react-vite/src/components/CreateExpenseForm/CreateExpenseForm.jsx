import ExpenseForm from "../ExpenseForm";

const CreateExpenseForm = (planId) => {
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
      planId={planId}
    />
  );
};

export default CreateExpenseForm;
