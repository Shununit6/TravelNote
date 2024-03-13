// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getPlanDetails } from "../../redux/plans";
import { Link } from 'react-router-dom';
import "./PlanIndexItem.css";
import Chart from '../Charts';
const PlanIndexItem = ({ plan, expense, manage }) => {
    // const dispatch = useDispatch();
    // const sessionUser = useSelector(state => state.session.user);
    // const { id, user_id, name, number_traveler, city, country, start_date, end_date, created_at, updated_at} = plan;
    const { id, name } = plan;
    const isPrivate = plan.private;
    const planexpenses = (id) =>{
        if(Object.values(expense) && Object.values(expense).filter(expense=>expense.plan_id==id).length){
            // console.log(Object.values(expense).filter(expense=>expense.plan_id==id));
            // console.log(Object.values(expense).filter(expense=>expense.plan_id==id).length);
            // console.log(Object.values(expense).filter(expense=>expense.plan_id==id)[0]);
            // console.log(Object.values(expense).filter(expense=>expense.plan_id==id)[1]);
            // console.log(Object.values(expense).filter(expense=>expense.plan_id==id)[2]);
            // const expensearr = Object.values(expense).filter(expense=>expense.plan_id==id);
            // expensearr.forEach((expense, index)=>{console.log(expense.amount)})
            return Object.values(expense).filter(expense=>expense.plan_id==id);
        }
    }
    const expensedata = planexpenses(id);
    console.log(expensedata)
    return (
        <Link id="planlinkwithtext" to={`/plans/${id}`} key={`${id}`}>
            <div id="plangrid1">
                <div id="planitem1">
                    {/* <img id="planExpenseImage" src={url} alt="planExpenseImage" /> */}
                </div>
                {expensedata && expensedata.map((expense)=>{return expense.amount, expense.category})}
                {/* <div id='myDiv'></div> */}
                <Chart/>
                {manage && <div id="planitem2">
                    {name}
                </div>}
                {!manage && !isPrivate && <div id="planitem2">
                    {name}
                </div>}
            </div>
        </Link>


    );
}

export default PlanIndexItem;
