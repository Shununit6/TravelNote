import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllPlans } from '../../redux/plans';
import PlanIndexItem from '../PlanIndexItem';
import "./Plans.css";

function Plans({num}) {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const plans = useSelector((state) => state.plans);
    useEffect(()=>{
      dispatch(getAllPlans()).then(()=>setIsLoaded(true))
    }, [dispatch]);

  if (!isLoaded) {
    return (<div>Loading...</div>);
  }
  // console.log(plans);
  if(isLoaded){
  return (
    <div id="planslistgrid">
        <h2>
            {/* <Link id="eventsIsNotActive" to="/events" > Events </Link> */}
        <Link id="plansIsActive" to="/plans" > Plans </Link>
        </h2>
        {
          num == 3 && <div id="viewallplans">
          {Object.values(plans).slice(0, 3).map((plan, index) => (
                <PlanIndexItem plan={plan} key={index}/>
          ))}
       </div>
        }
        {
          num != 3 && <div id="viewallplans">
            {Object.values(plans).map((plan, index) => (
                  <PlanIndexItem plan={plan} key={index}/>
            ))}
         </div>
        }
    </div>
  );}
}

export default Plans;
