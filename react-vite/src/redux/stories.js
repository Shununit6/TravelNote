// /** Action Type Constants: */
export const LOAD_STORIES = "stories/LOAD_STORIES";
export const LOAD_STORY_DETAILS = "stories/LOAD_STORIES_DETAILS";
export const RECEIVE_STORY = "stories/RECEIVE_STORY";
export const UPDATE_STORY = "stories/UPDATE_STORY";
export const REMOVE_STORY = "stories/REMOVE_STORY";

// /**  Action Creators: */
export const loadStories = (stories) => ({
    type: LOAD_STORIES,
    stories,
});

export const loadStoryDetails = (story) => ({
    type: LOAD_STORY_DETAILS,
    story,
});

export const receiveStory = (story) => ({
    type: RECEIVE_STORY,
    story,
});

export const editStory = (story) => ({
    type: UPDATE_STORY,
    story,
});

export const removeStory = (story) => ({
    type: REMOVE_STORY,
    story,
});

// /** Thunk Action Creators: */
export const getAllStories = () => async (dispatch) => {
    const res = await fetch(`/api/stories`);

    if (res.ok) {
        const data = await res.json();
        // console.log("data", data);
        dispatch(loadStories(data));
        return data;
    }
    return res;
};

export const getStoryDetails = (storyId) => async dispatch => {
    // console.log("Fetching story details for storyId:", storyId);
    const res = await fetch(`/api/stories/${storyId}`);

    if (res.ok) {
        const data = await res.json();
        // console.log("Received data:", data);
        dispatch(loadStoryDetails(data));
        return data;
    }
    // console.log("Error fetching story details:", res.statusText);
    return res;
};

export const getMyStories = () => async (dispatch) => {
    const res = await fetch('/api/stories/current');
    if (res.ok) {
        const data = await res.json();
        dispatch(loadStories(data));
        return data;
    }
    return res;
};

export const createStory = (payload) => async (dispatch) => {
    const res = await fetch("/api/stories/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(receiveStory(data));
        return data;
    }
    return res;
};

export const updateStory = (story) => async (dispatch) => {
    const res = await fetch(`/api/stories/${story.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(story),
    });
    if (res.ok) {
        const data = await res.json();
        dispatch(editStory(data));
        return data;
    }
    return res;
};

export const deleteStory = (storyId) => async (dispatch) => {
    const res = await fetch(`/api/stories/${storyId}`, {
        method: "DELETE",
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(removeStory(storyId));
        return data;
    }
    return res;
};

const storiesReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_STORIES: {
            const storiesState = { ...state };
            action.stories.stories.forEach((story) => {
                if (!storiesState[story.id]) { storiesState[story.id] = story; }
            });
            return {...storiesState};
        }
        case LOAD_STORY_DETAILS: {
            return { ...state, [action.story.id]: action.story };
        }
        case RECEIVE_STORY:
            return { ...state, [action.story.id]: action.story };
        case UPDATE_STORY:
            return { ...state };
        case REMOVE_STORY: {
            const storyState = { ...state };
            delete storyState[action.story];
            return {...storyState};
        }
        default:
            return { ...state };
    }
};

export default storiesReducer;
