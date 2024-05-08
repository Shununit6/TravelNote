import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllPlans } from '../../redux/plans';
import PlanIndexItem from '../PlanIndexItem';
import "./Plans.css";
import { getAllExpenses } from '../../redux/expenses';
import loading from '../../../src/images/loading.mp4';

function Plans({num}) {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    // const sessionUser = useSelector(state => state.session.user);
    const plans = useSelector((state) => state.plans);
    const expenses = useSelector((state)=> state.expenses);
    // console.log(Object.values(expenses));
    const expense = Object.values(expenses);
    useEffect(()=>{
      dispatch(getAllExpenses()).then(()=>dispatch(getAllPlans())).then(()=>setIsLoaded(true))
    }, [dispatch]);

  if (!isLoaded) {
    return (
      <div className="loadingcontainer">
        <div className='loadingmp4'><video autoPlay><source src={loading} type="video/mp4"></source></video></div>
      </div>
    );
  }
  // console.log(plans);
  if(isLoaded){
  return (
    <div id="planslistgrid">
        {num ==2 && <h2>
          <Link id="plansmainpage" to="/plans" > Plans </Link>
          {/* {sessionUser &&
          <div >
            <Link to="/plans/current"><button>View my plans</button></Link>
          </div>} */}
        </h2>}
        {num !=2 && <h2 id="switchlinkplan">
          <Link id="plansIsActive" to="/plans" > Plans </Link>
          <Link id="placesIsNotActive" to="/places" > Places </Link>
          <Link id="storiesIsNotActive" to="/stories" > Stories </Link>
        </h2>}
        {
          num == 2 && <div id="viewallplans">
          {Object.values(plans).slice(0, 2).map((plan, index) => (
                <PlanIndexItem plan={plan} expense={expense} key={index}/>
          ))}
       </div>
        }
        {
          num != 2 && <div id="viewallplans1">
            {Object.values(plans).map((plan, index) => (
                  <PlanIndexItem plan={plan} expense={expense} key={index}/>
            ))}
         </div>
        }
    </div>
  );}
}

export default Plans;
