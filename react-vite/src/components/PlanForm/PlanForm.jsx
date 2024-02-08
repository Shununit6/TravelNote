import { useState, useEffect } from "react";
import { useHistory,} from "react-router-dom"; //useParams,
import { useDispatch, useSelector} from "react-redux"; //useSelector
import { createPlan, updatePlan } from "../../redux/plans";
import "./PlanForm.css";

const PlanForm = ({ plan, formType }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const plans = useSelector(state => state.plans);
    let [name, setName] = useState(plan?.name);
    let [number_traveler, setNumber_Traveler] = useState(plan?.number_traveler);
    let [city, setCity] = useState(plan?.city);
    let [country, setCountry] = useState(plan?.country);
    let [startDate, setStartDate] = useState(plan?.start_date);
    let [endDate, setEndDate] = useState(plan?.end_date);
    let privateState;
    let organizerId = sessionUser.id;
    if(plan?.private === 1){
        privateState="Private";
    }else if(plan?.private === 0){
        privateState="Public";
    }else{
        privateState="";
    }
    let [isPrivate, setIsPrivate] = useState(privateState);

    let isUpdate = false;
    if(formType === "Update Plan"){
        isUpdate = true;
    }

    const [validationErrors, setValidationErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {
        const errors = { name: [], number_traveler: [], isPrivate:[], city: [], country:[], startDate:[], endDate:[] };
        if (!name.length) errors["name"].push("Name is required");
        if (name.length > 60) errors["name"].push("Name must be 60 characters or less");
        if (number_traveler < 1) errors["number_traveler"].push("");
        if (!isPrivate.length) errors["isPrivate"].push("Visibility Type is required");
        if (!city.length) errors["city"].push("City is required");
        if (!country.length) errors["country"].push("Country is required");
        if (!startDate.length) errors["startDate"].push("Plan start date is required");
        if (new Date(`${new Date()}`).getTime() > new Date(startDate).getTime()) errors["startDate"].push("Start date must be in the future");
        if (!endDate.length) errors["endDate"].push("Plan end date is required");
        if (new Date(`${endDate}`).getTime() < new Date(startDate).getTime()) errors["endDate"].push("End date is less than start date");

        setValidationErrors(errors);
    }, [name, number_traveler, isPrivate, city, country, startDate, endDate]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);

        if(isPrivate === "Private"){
            isPrivate = 1;
        }else{
            isPrivate = 0;
        }
        plan = { ...plan,  name, number_traveler, private:isPrivate, city, country, startDate, endDate };

        let newPlan;
        let errorCount = validationErrors.name.length + validationErrors.number_traveler.length
        + validationErrors.isPrivate.length + validationErrors.city.length
        + validationErrors.country.length + validationErrors.startDate.length
        + validationErrors.endDate.length;
        // console.log(errorCount);
        if (errorCount > 0){
            // console.log("has errors");
            }else{
                // console.log("no errors");
                if (formType === "Update Plan") {
                    newPlan = await dispatch(updatePlan(plan));
                } else {
                    newPlan = await dispatch(createPlan(plan));
                }
                if (newPlan.id) {
                    // console.log("newPlan.id", newPlan.id);
                    history.push(`/plans/${newPlan.id}`);
                } else {
                    const { validationErrors } = await newPlan.json();
                    setValidationErrors(validationErrors);
                }
                // console.log(newPlan);

                setName('');
                setNumber_Traveler('');
                setIsPrivate('');
                setCity('');
                setCountry('');
                setStartDate('');
                setEndDate('');
                setValidationErrors({});
                setHasSubmitted(false);
            }
    };

//     /* **DO NOT CHANGE THE RETURN VALUE** */
    return (
        <form onSubmit={handleSubmit}>
            {/* {console.log(validationErrors)} */}
            <div id="planformcreateupdate">
                <div id="titlecreateupdategroupform">
                    {!isUpdate && <h2>Start a New Plan</h2>}
                    {isUpdate && <h2>Update your Plan</h2>}
                </div>
            <div>
                <label>
                    <input
                        id='planformname'
                        type="text"
                        placeholder="What is your plan name?"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                    {hasSubmitted &&
                        validationErrors.name.length > 0 &&
                        validationErrors.name.map((error, idx) => (
                            <div key={idx}>
                                <p className="error">{error}</p>
                            </div>
                        ))}
                </label>
            </div>
            <div>
                <label>
                    <textarea
                        id='planformnumber'
                        value={number_traveler}
                        placeholder="Please enter a number larger than 0"
                        onChange={(e) => setAbout(e.target.value)}
                    />
                    {hasSubmitted &&
                        validationErrors.number_traveler.length > 0 &&
                        validationErrors.number_traveler.map((error, idx) => (
                            <div key={idx}>
                                <p className="error">{error}</p>
                            </div>
                        ))}
                </label>
            </div>
            <div>
                <label>
                    <p>Is this a private or public plan?</p>
                    <select id="type" value={type} onChange={(e) => setType(e.target.value)}>
                        <option value='' disabled>(select one)</option>
                        <option value="Private">Private</option>
                        <option value="Public">Public</option>
                    </select>
                    {hasSubmitted &&
                        validationErrors.type.length > 0 &&
                        validationErrors.type.map((error, idx) => (
                            <div key={idx}>
                                <p className="error">{error}</p>
                            </div>
                        ))}
                </label>
            </div>
            <div>
                <label>
                    <p>Is this group private or public?</p>
                    <select id="groupformisPrivate" value={isPrivate} onChange={(e) => setIsPrivate(e.target.value)}>
                        <option value='' disabled>(select one)</option>
                        <option value="Private">Private</option>
                        <option value="Public">Public</option>
                    </select>
                    {hasSubmitted &&
                        validationErrors.isPrivate.length > 0 &&
                        validationErrors.isPrivate.map((error, idx) => (
                            <div key={idx}>
                                <p className="error">{error}</p>
                            </div>
                        ))}
                </label>
            </div>

            <button type="submit" id="GroupCreateUpdateButton" >{formType}</button>
            </div>
        </form>
    );
};

export default PlanForm;
