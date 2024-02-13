import { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { useSelector, useDispatch} from "react-redux";
import { getPlanDetails} from '../../redux/plans';
import "./planDetails.css";
import DeleteModal from "../DeleteModal";
import DeletePlanModal from "../DeletePlanModal";
const PlanDetails = () => {
    const dispatch = useDispatch();
    let { planId } = useParams();
    const sessionUser = useSelector(state => state.session.user);
    const [isLoaded, setIsLoaded] = useState(false);
    const planData = useSelector((state) => state.plans[planId]);

    useEffect(() => {
        dispatch(getPlanDetails(planId)).then(()=>setIsLoaded(true))
    }, [dispatch, planId])
    if(isLoaded && !planData){
        return (<Navigate to="/plans"/>);
    }
    if(!isLoaded) {
        return (<div>Loading...</div>);
    }
    // const { id, user_id, name, number_traveler, city, country, start_date, end_date, created_at, updated_at} = planData;
    const { user_id, name, number_traveler, city, country, start_date, end_date } = planData;
    let isPlanCreator=false;
    if(sessionUser && planData && user_id === sessionUser.id){
        isPlanCreator=true;
    }

    let isPrivate;
    if(planData.private){
        isPrivate = "Private";
    }else{
        isPrivate = "Public";
    }

    if(isLoaded){
        return(
            <div id="items">
                {/* <div id="items-2"></div> */}
                <div id="item1">
                    <Link to={"/plans"}> <p>Plans</p> </Link>
                </div>
                {/* <div id="item2">
                    <img id="images" src={imageUrl} alt="plan"/>
                </div> */}
                <div id="item3">
                    <h1>{name}</h1>
                    <p>{number_traveler}</p>
                    <p>{city}, {country}</p>
                    <p>{isPrivate}</p>
                    <p> by {start_date} {end_date}</p>
                </div>
                    {sessionUser && isPlanCreator ?
                        <div id="item4" className="buttons-container">
                        <Link to={`/plans/${planId}/edit`}>
                            <button id="updateplandetails" >Update</button>
                        </Link>
                        <DeleteModal id="deleteplandetails"
                                itemText="Delete"
                                modalComponent={<DeletePlanModal plan={planData}/>}
                                />
                        </div>
                        : null}
            </div>
        );
    }

};

export default PlanDetails;
