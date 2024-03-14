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
    const { id, name, number_traveler } = plan;
    const isPrivate = plan.private;
    const planexpenses = (id) =>{
        if(expense && Object.values(expense) && Object.values(expense).filter(expense=>expense.plan_id==id).length){
            return Object.values(expense).filter(expense=>expense.plan_id==id);
        }
    }
    const expensedata = planexpenses(id);
    console.log(expensedata)
    const data = []
    const datacategory = []
    const dataamount = []
    data.push(["category", "amount"])
    if(expensedata){
        expensedata.forEach((x)=>{
            if(datacategory.includes(x.category) && x.split==false){
                dataamount[datacategory.indexOf(x.category)] += x.amount
            }
            if(!datacategory.includes(x.category) && x.split==false){
                datacategory.push(x.category)
                dataamount.push(x.amount)
            }
            if(datacategory.includes(x.category) && x.split==true){
                dataamount[datacategory.indexOf(x.category)] += x.amount/number_traveler
            }
            if(!datacategory.includes(x.category) && x.split==true){
                datacategory.push(x.category)
                dataamount.push(x.amount/number_traveler)
            }
        })
        datacategory.forEach((x, index)=>{
            data.push([x, dataamount[index]])
        })
    }
    // const options = {
    //     title: "Plan Expenses",
    // };

    return (
        <Link id="planlinkwithtext" to={`/plans/${id}`} key={`${id}`}>
            <div id="plangrid1">
                <div id="planitem1">
                    {/* <img id="planExpenseImage" src={url} alt="planExpenseImage" /> */}
                </div>
                {/* {expensedata && expensedata.map((expense)=>{return expense.amount, expense.category})} */}
                {/* <div id='myDiv'></div> */}
                {/* {expensedata && <Chart data={data}/>} */}
                {manage && expensedata && <div id="planitem2">
                    {name}
                    <Chart data={data}/>
                </div>}
                {!manage && !isPrivate && expensedata && <div id="planitem2">
                    {name}
                    <Chart data={data}/>
                </div>}
            </div>
        </Link>


    );
}

export default PlanIndexItem;
