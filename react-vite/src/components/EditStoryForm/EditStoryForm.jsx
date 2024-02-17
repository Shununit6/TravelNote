import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getStoryDetails } from "../../redux/stories";
import { useEffect } from "react";
import StoryForm from "../StoryForm";

const EditStoryForm = () => {
    const dispatch = useDispatch();
    const { storyId } = useParams();
    const story = useSelector((state) => state.stories[storyId]);

    useEffect(() => {
        dispatch(getStoryDetails(storyId));
    }, [dispatch, storyId]);

    if (!story) return <></>;

    /* **DO NOT CHANGE THE RETURN VALUE** */
    return (
        Object.keys(story).length > 0 && (
            <>
                <StoryForm story={story} formType="Update Story" />
            </>
        )
    );
};

export default EditStoryForm;
