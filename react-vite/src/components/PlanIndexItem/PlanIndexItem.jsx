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
    const { id, name, number_traveler, city, country, start_date, end_date} = plan;
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
    // let options;
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
    // options = {
    //       title: "Plan Expenses",
    // };

    return (
        <Link id="planlinkwithtext" to={`/plans/${id}`} key={`${id}`}>
            <div id="plangrid1">
                <div id="planitem1">
                    {/* <img id="planExpenseImage" src={url} alt="planExpenseImage" /> */}
                </div>
                {manage && !expensedata &&
                <div>
                    <h1>{name}</h1>
                    <p>Number Of Traveler: {number_traveler}</p>
                    <p>Destination: {city}, {country}</p>
                    <p>Travel Duration: From {start_date} To {end_date}</p>
                    <p>Expenses of {name} not available</p>
                </div>
                }
                {manage && expensedata && <div id="planitem2">
                <div>
                    <h1>{name}</h1>
                    <p>Number Of Traveler: {number_traveler}</p>
                    <p>Destination: {city}, {country}</p>
                    <p>Travel Duration: From {start_date} To {end_date}</p>
                </div>
                    <Chart data={data} options={{title: `${name}`, pieSliceText: "label",}}/>
                </div>}
                {!manage && !expensedata && !isPrivate &&
                <div>
                    <h1>{name}</h1>
                    <p>Number Of Traveler: {number_traveler}</p>
                    <p>Destination: {city}, {country}</p>
                    <p>Travel Duration: From {start_date} To {end_date}</p>
                    <p>Expenses of {name} not available</p>
                </div>
                }
                {!manage && !isPrivate && expensedata && <div id="planitem2">
                <div>
                    <h1>{name}</h1>
                    <p>Number Of Traveler: {number_traveler}</p>
                    <p>Destination: {city}, {country}</p>
                    <p>Travel Duration: From {start_date} To {end_date}</p>
                </div>
                    <Chart data={data} options={{title: `${name}`, pieSliceText: "label",}}/>
                </div>}
            </div>
        </Link>
    );
}

export default PlanIndexItem;
