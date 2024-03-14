import { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { useSelector, useDispatch} from "react-redux";
import { getPlanDetails} from '../../redux/plans';
import "./PlanDetails.css";
import DeleteModal from "../DeleteModal";
import DeletePlanModal from "../DeletePlanModal";
import Chart from '../Charts';
import { getAllExpenses } from '../../redux/expenses';

const PlanDetails = () => {
    const dispatch = useDispatch();
    let { planId } = useParams();
    const sessionUser = useSelector(state => state.session.user);
    const [isLoaded, setIsLoaded] = useState(false);
    const planData = useSelector((state) => state.plans[planId]);
    const expenses = useSelector((state)=> state.expenses);
    const expense = Object.values(expenses);

    useEffect(() => {
        dispatch(getAllExpenses()).then(()=>dispatch(getPlanDetails(planId))).then(()=>setIsLoaded(true))
    }, [dispatch, planId])
    if(isLoaded && !planData){
        return (<Navigate to="/plans"/>);
    }
    if(!isLoaded) {
        return (<div>Loading...</div>);
    }
    // const { id, user_id, name, number_traveler, city, country, start_date, end_date, created_at, updated_at} = planData;
    const { id, user_id, name, number_traveler, city, country, start_date, end_date } = planData;
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

    const planexpenses = (id) =>{
        if(expense && Object.values(expense) && Object.values(expense).filter(expense=>expense.plan_id==id).length){
            return Object.values(expense).filter(expense=>expense.plan_id==id);
        }
    }
    const expensedata = planexpenses(id);
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

    const dataone = []
    const dataname = []
    const dataamountone = []
    dataone.push(["name", "amount"])
    if(expensedata){
        expensedata.forEach((x)=>{
            if(dataname.includes(x.name) && x.split==false){
                dataamountone[dataname.indexOf(x.name)] += x.amount
            }
            if(!dataname.includes(x.name) && x.split==false){
                dataname.push(x.name)
                dataamountone.push(x.amount)
            }
            if(dataname.includes(x.name) && x.split==true){
                dataamountone[dataname.indexOf(x.name)] += x.amount/number_traveler
            }
            if(!dataname.includes(x.name) && x.split==true){
                dataname.push(x.name)
                dataamountone.push(x.amount/number_traveler)
            }
        })
        dataname.forEach((x, index)=>{
            dataone.push([x, dataamountone[index]])
        })
    }

    if(isLoaded){
        return(
            <div id="planitems">
                {/* <div id="items-2"></div> */}
                <div id="item1">
                    <Link id="plantext" to={"/plans"}> <p>Plans</p> </Link>
                </div>
                <div id="item2">
                <div id="plandatachartdetail">
                    {expensedata &&
                    <Chart data={data} options={{title: `${name}`, pieSliceText: "label",}}/>
                    }
                </div>
                <div id="plandataonechartdetail">
                    {expensedata &&
                    <Chart data={dataone} options={{title: `${name}`, pieSliceText: "label",}}/>
                    }
                </div>
                </div>
                {/* <ul>
                    <ol>Expense Name</ol>
                    <ol>Category</ol>
                    <ol>Amount</ol>
                </ul>
                {expensedata && expensedata.map((expense) => (
                    <ul>
                        <ol>{expense.name}</ol>
                        <ol>{expense.category}</ol>
                        <ol>{expense.amount}</ol>
                    </ul>
                    // <div key={index}>name:{expense.name}category:{expense.category}amount:{expense.amount}split{expense.split}</div>
                ))} */}
                <div id="item3">
                    <p>{name}</p>
                    <p>Number Of Traveler: {number_traveler}</p>
                    <p>Destination: {city}, {country}</p>
                    <p>{isPrivate} Travel Plan</p>
                    <p>Travel Duration: From {start_date} To {end_date}</p>
                </div>
                    {sessionUser && isPlanCreator ?
                        <div id="item4" className="buttons-container">
                        <Link to={`/plans/${planId}/edit`}>
                            <button id="updateplandetails" >Update My Plan</button>
                        </Link>
                        <DeleteModal id="deleteplandetails"
                                itemText="Delete My Plan"
                                modalComponent={<DeletePlanModal plan={planData}/>}
                                />
                        </div>
                        : null}
            </div>
        );
    }

};

export default PlanDetails;
