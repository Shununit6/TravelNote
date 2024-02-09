// /** Action Type Constants: */
export const LOAD_PLANS = "plans/LOAD_PLANS";
export const LOAD_PLAN_DETAILS = "plans/LOAD_PLAN_DETAILS";
export const RECEIVE_PLAN = "plans/RECEIVE_PLAN";
export const UPDATE_PLAN = "plans/UPDATE_PLAN";
export const REMOVE_PLAN = "plans/REMOVE_PLAN";

// /**  Action Creators: */
export const loadPlans = (plans) => ({
    type: LOAD_PLANS,
    plans,
});

export const loadPlanDetails = (plan) => ({
    type: LOAD_PLAN_DETAILS,
    plan,
});

export const receivePlan = (plan) => ({
    type: RECEIVE_PLAN,
    plan,
});

export const editPlan = (plan) => ({
    type: UPDATE_PLAN,
    plan,
});

export const removePlan = (plan) => ({
    type: REMOVE_PLAN,
    plan,
});

// /** Thunk Action Creators: */
export const getAllPlans = () => async (dispatch) => {
    const res = await fetch(`/api/plans`);

    if (res.ok) {
        const data = await res.json();
        // console.log("data", data);
        dispatch(loadPlans(data));
        return data;
    }
    return res;
};

export const getPlanDetails = (planId) => async dispatch => {
    // console.log("Fetching plan details for planId:", planId);
    const res = await fetch(`/api/plans/${planId}`);

    if (res.ok) {
        const data = await res.json();
        // console.log("Received data:", data);
        dispatch(loadPlanDetails(data));
        return data;
    }
    // console.log("Error fetching plan details:", res.statusText);
    return res;
};

export const getMyPlans = () => async (dispatch) => {
    const res = await fetch('/api/plans/current');
    if (res.ok) {
        const data = await res.json();
        dispatch(loadPlans(data));
        return data;
    }
    return res;
};

export const createPlan = (payload) => async (dispatch) => {
    const res = await fetch("/api/plans/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(receivePlan(data));
        return data;
    }
    return res;
};

export const updatePlan = (plan) => async (dispatch) => {
    const res = await fetch(`/api/plans/${plan.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(plan),
    });
    if (res.ok) {
        const data = await res.json();
        dispatch(editPlan(data));
        return data;
    }
    return res;
};

export const deletePlan = (planId) => async (dispatch) => {
    const res = await fetch(`/api/plans/${planId}`, {
        method: "DELETE",
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(removePlan(planId));
        return data;
    }
    return res;
};

const plansReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_PLANS: {
            const plansState = { ...state };
            action.plans.plans.forEach((plan) => {
                if (!plansState[plan.id]) { plansState[plan.id] = plan; }
            });
            return plansState;
        }
        case LOAD_PLAN_DETAILS: {
            return { ...state, [action.plan.id]: action.plan };
        }
        case RECEIVE_PLAN:
            return { ...state, [action.plan.id]: action.plan };
        case UPDATE_PLAN:
            return { ...state };
        case REMOVE_PLAN: {
            const planState = { ...state };
            delete planState[action.plan];
            return planState;
        }
        default:
            return state;
    }
};

export default plansReducer;
