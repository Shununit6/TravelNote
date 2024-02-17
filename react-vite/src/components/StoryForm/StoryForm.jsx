import { useState, useEffect } from "react";
import { useNavigate} from "react-router-dom"; //useParams,
import { useDispatch, useSelector} from "react-redux"; //useSelector
import { createStory, updateStory } from "../../redux/stories";
import "./StoryForm.css";

const StoryForm = ({ story, formType }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const sessionUser = useSelector(state => state.session.user);
    const stories = useSelector(state => state.stories);
    let [title, setTitle] = useState(story?.title);
    let [description, setDescription] = useState(story?.description);
    let [article_url, setArticle] = useState(story?.article_url);
    let [shorts_url, setShorts] = useState(story.shorts_url);
    let isUpdate = false;
    if(formType === "Update Story"){
        isUpdate = true;
    }

    const [validationErrors, setValidationErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);
    console.log(stories);
    console.log(sessionUser.user_id)

    useEffect(() => {
        const errors = { title: [], description: [], article_url:[], shorts_url:[]};
        if (!title.length) errors["name"].push("Title is required");
        if (title.length > 60) errors["title"].push("Title must be 60 characters or less");
        if (!description.length) errors["description"].push("Description is required");
        if (!article_url.length) errors["article"].push("Article URL is required");
        if (!shorts_url.length) errors["article"].push("Shorts URL is required");

        setValidationErrors(errors);
    }, [title, description, article_url, shorts_url]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);

        story = { ...story, description, article_url, shorts_url};

        let newStory;
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
