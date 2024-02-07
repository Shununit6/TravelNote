import PlanForm from "../PlanForm";

const CreatePlanForm = () => {
  const plan = {
    name: '',
    number_traveler: '',
    private: '',
    city: '',
    country: '',
    start_date: '',
    end_date: ''
    };


  /* **DO NOT CHANGE THE RETURN VALUE** */
  return (
    <PlanForm
      plan={plan}
      formType="Create Plan"
    />
  );
};

export default CreatePlanForm;
