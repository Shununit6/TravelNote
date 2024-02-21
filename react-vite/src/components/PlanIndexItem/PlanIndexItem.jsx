// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getPlanDetails } from "../../redux/plans";
import { Link } from 'react-router-dom';
import "./PlanIndexItem.css";
const PlanIndexItem = ({ plan }) => {
    // const dispatch = useDispatch();
    // const sessionUser = useSelector(state => state.session.user);
    // const { id, user_id, name, number_traveler, city, country, start_date, end_date, created_at, updated_at} = plan;
    const { id, name } = plan;
    const isPrivate = plan.private;

    return (
        <Link id="planlinkwithtext" to={`/plans/${id}`} key={`${id}`}>
            <div id="plangrid1">
                {/* <div id="planitem1">
                    <img id="planExpenseImage" src={url} alt="planExpenseImage" />
                </div> */}
                {!isPrivate && <div id="planitem2">
                    {name}
                </div>}
            </div>
        </Link>


    );
}

export default PlanIndexItem;
