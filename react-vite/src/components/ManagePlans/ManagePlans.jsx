import './ManagePlans.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPlans } from '../../redux/plans';
import PlanIndexItem from '../PlanIndexItem';
// import MenuLibrary from '../MenuLibrary';
import { getAllExpenses } from '../../redux/expenses';

const ManagePlans = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const sessionUser = useSelector(state => state.session.user);
    const manage = true;
    const plans = Object.values(useSelector((state) => state.plans));
    const expenses = useSelector((state)=> state.expenses);
    const expense = Object.values(expenses);
    useEffect(() => {
        dispatch(getAllExpenses()).then(()=>dispatch(getAllPlans())).then(() => setIsLoading(false));
    }, [dispatch]);

    if (isLoading) return <>Loading...</>;


    const plansByUser = plans ? plans.filter(plan => {
        return plan.user_id === sessionUser?.id;
    }) : [];

    // console.log("plansByUser:", plansByUser);

    const hasPlans = plansByUser.length > 0;

    return (
        <div className='managePlanwrapper'>
            {/* <div className='managePlanitem-1'>
                <MenuLibrary />
            </div> */}
            <div className='managePlanitem-2'>
            <h1 className='title'>My Plans</h1>
            <Link id="plansIsActive" to="/plans/current" > My Plans </Link>
            <Link id="placesIsNotActive" to="/places/current" > My Places </Link>
            <Link id="storiesIsNotActive" to="/stories/current" > My Stories </Link>
            {!hasPlans && <Link to={'/plans/new'}><button className='createPlanButton'>Create a New Plan</button></Link>}
            {hasPlans && <ul className='managePlanIndex'>
                {plansByUser.map((plan) => (
                    <ul className='manageEachPlan' key={String(plan.id)}>
                        {plan && <PlanIndexItem expense={expense} manage={manage} plan={plan} />}
                    </ul>
                ))}
             </ul>}
            </div>
        </div>
    );
};

export default ManagePlans;
