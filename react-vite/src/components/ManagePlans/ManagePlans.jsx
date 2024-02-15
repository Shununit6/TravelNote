import './ManagePlans.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPlans } from '../../redux/plans';
import PlanIndexItem from '../PlanIndexItem';
// import MenuLibrary from '../MenuLibrary';

const ManagePlans = () => {
    const dispatch = useDispatch();
    const plans = useSelector((state) => Object.values(state.plans));
    const [isLoading, setIsLoading] = useState(true);
    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        if (sessionUser) {
            dispatch(getAllPlans()).then(() => setIsLoading(false));
        }
    }, [dispatch, sessionUser]);

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
            <p className='title'>Manage My Plans</p>
            {!hasPlans && <Link to={'/plans/new'}><button className='createPlanButton'>Create a New Plan</button></Link>}
            {hasPlans && <ul className='managePlanIndex'>
                {plansByUser.map((plan) => (
                    <ul className='manageEachPlan' key={String(plan.id)}>
                        {plan && <PlanIndexItem plan={plan} />}
                    </ul>
                ))}
             </ul>}
            </div>
        </div>
    );
};

export default ManagePlans;
