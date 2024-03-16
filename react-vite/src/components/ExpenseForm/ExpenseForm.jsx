import { useState, useEffect } from "react";
import { useNavigate} from "react-router-dom"; //useParams,
import { useDispatch, useSelector} from "react-redux"; //useSelector
import { createExpense, updateExpense } from "../../redux/expenses";
import "./ExpenseForm.css";

const ExpenseForm = ({ expense, formType }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const sessionUser = useSelector(state => state.session.user);
    const places = useSelector(state => state.places);
    let [name, setName] = useState(place?.name);
    let [type, setType] = useState(place?.type);
    let [description, setDescription] = useState(place?.description);

    let isUpdate = false;
    if(formType === "Update Place"){
        isUpdate = true;
    }

    const [validationErrors, setValidationErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);
    console.log(places);
    console.log(sessionUser.user_id)

    useEffect(() => {
        const errors = { name: [], type: [], description:[]};
        if (!name.length) errors["name"].push("Name is required");
        if (name.length > 60) errors["name"].push("Name must be 60 characters or less");
        if (!type.length) errors["type"].push("Type is required");
        if (!description.length) errors["description"].push("Description is required");

        setValidationErrors(errors);
    }, [name, type, description]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);

        place = { ...place, name, type, description};

        let newPlace;
        let errorCount = validationErrors.name.length + validationErrors.type.length
        + validationErrors.description.length;
        // console.log(errorCount);
        if (errorCount > 0){
            // console.log("has errors");
            }else{
                // console.log("no errors");
                if (formType === "Update Place") {
                    // console.log("before", place)
                    newPlace = await dispatch(updatePlace(place));
                    // console.log("after", newPlace)
                } else {
                    newPlace = await dispatch(createPlace(place));
                }
                if (newPlace.id) {
                    // console.log("newPlace.id", newPlace.id);
                    navigate(`/places/${newPlace.id}`);
                } else {
                    const { validationErrors } = await newPlace.json();
                    setValidationErrors(validationErrors);
                }
                // console.log(newPlace);

                setName('');
                setType('');
                setDescription('');
                setValidationErrors({});
                setHasSubmitted(false);
            }
    };

//     /* **DO NOT CHANGE THE RETURN VALUE** */
    return (
        <form onSubmit={handleSubmit}>
            {/* {console.log(validationErrors)} */}
            <div id="placeformcreateupdate">
                <div id="titlecreateupdateplaceform">
                    {!isUpdate && <h2>Start a New Place</h2>}
                    {isUpdate && <h2>Update your Place</h2>}
                </div>
            <div>
                <label>
                    <input
                        id='placeformname'
                        type="text"
                        placeholder="What is your place name?"
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
                    <input
                        id='placeformtype'
                        type="text"
                        placeholder="Please add the type"
                        onChange={(e) => setType(e.target.value)}
                        value={type}
                    />
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
                    <textarea
                        id='placeformdescription'
                        placeholder="Please add the description"
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                    />
                    {hasSubmitted &&
                        validationErrors.description.length > 0 &&
                        validationErrors.description.map((error, idx) => (
                            <div key={idx}>
                                <p className="error">{error}</p>
                            </div>
                        ))}
                </label>
            </div>
            <button type="submit" id="PlaceCreateUpdateButton" >{formType}</button>
            </div>
        </form>
    );
};

export default PlaceForm;
