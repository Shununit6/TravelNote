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
        let errorCount = validationErrors.description.length + validationErrors.article_url.length
        + validationErrors.shorts_url.length + validationErrors.description.length;
        // console.log(errorCount);
        if (errorCount > 0){
            // console.log("has errors");
            }else{
                // console.log("no errors");
                if (formType === "Update Story") {
                    // console.log("before", story)
                    newStory = await dispatch(updateStory(story));
                    // console.log("after", newStory)
                } else {
                    newStory = await dispatch(createStory(story));
                }
                if (newStory.id) {
                    // console.log("newStory.id", newStory.id);
                    navigate(`/stories/${newStory.id}`);
                } else {
                    const { validationErrors } = await newStory.json();
                    setValidationErrors(validationErrors);
                }
                // console.log(newStory);

                setTitle('');
                setDescription('');
                setArticle('');
                setShorts('');
                setValidationErrors({});
                setHasSubmitted(false);
            }
    };

//     /* **DO NOT CHANGE THE RETURN VALUE** */
    return (
        <form onSubmit={handleSubmit}>
            {/* {console.log(validationErrors)} */}
            <div id="storyformcreateupdate">
                <div id="titlecreateupdatestoryform">
                    {!isUpdate && <h2>Start a New Story</h2>}
                    {isUpdate && <h2>Update your Story</h2>}
                </div>
            <div>
                <label>
                    <input
                        id='storyformtitle'
                        type="text"
                        placeholder="What is your story title?"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />
                    {hasSubmitted &&
                        validationErrors.title.length > 0 &&
                        validationErrors.title.map((error, idx) => (
                            <div key={idx}>
                                <p className="error">{error}</p>
                            </div>
                        ))}
                </label>
            </div>
            <div>
                <label>
                    <textarea
                        id='storyformdescription'
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
            <div>
                <label>
                    <input
                        id='storyformarticle'
                        type="text"
                        placeholder="Please add the article url"
                        onChange={(e) => setType(e.target.value)}
                        value={type}
                    />
                    {hasSubmitted &&
                        validationErrors.article_url.length > 0 &&
                        validationErrors.article_url.map((error, idx) => (
                            <div key={idx}>
                                <p className="error">{error}</p>
                            </div>
                        ))}
                </label>
            </div>
            <div>
                <label>
                    <input
                        id='storyformshorts'
                        type="text"
                        placeholder="Please add the shorts url"
                        onChange={(e) => setShorts(e.target.value)}
                        value={type}
                    />
                    {hasSubmitted &&
                        validationErrors.shorts_url.length > 0 &&
                        validationErrors.shorts_url.map((error, idx) => (
                            <div key={idx}>
                                <p className="error">{error}</p>
                            </div>
                        ))}
                </label>
            </div>
            <button type="submit" id="StoryCreateUpdateButton" >{formType}</button>
            </div>
        </form>
    );
};

export default StoryForm;
