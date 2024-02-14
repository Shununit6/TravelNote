import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getPlanDetails } from "../../redux/plans";
import { useEffect } from "react";
import PlanForm from "../PlanForm";

const EditPlanForm = () => {
    const dispatch = useDispatch();
    const { planId } = useParams();
    const plan = useSelector((state) => state.plans[planId]);

    useEffect(() => {
        dispatch(getPlanDetails(planId));
    }, [dispatch, planId]);

    if (!plan) return <></>;

    /* **DO NOT CHANGE THE RETURN VALUE** */
    return (
        Object.keys(plan).length > 0 && (
            <>
                <PlanForm plan={plan} formType="Update Plan" />
            </>
        )
    );
};

export default EditPlanForm;
