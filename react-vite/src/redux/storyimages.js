// /** Action Type Constants: */
export const LOAD_IMAGES = "storyimages/LOAD_IMAGES";
export const LOAD_STORYIMAGE = "storyimages/LOAD_STORYIMAGE";
export const RECEIVE_IMAGE = "storyimages/RECEIVE_IMAGE";
export const UPDATE_IMAGE = "storyimages/UPDATE_IMAGE";
export const REMOVE_IMAGE = "storyimages/REMOVE_IMAGE";

// /**  Action Creators: */
export const loadImages = (images) => ({
    type: LOAD_IMAGES,
    images,
});

export const loadStoryImage = (image) => ({
    type: LOAD_STORYIMAGE,
    image,
});

export const receiveImage = (image) => ({
    type: RECEIVE_IMAGE,
    image,
});

export const editImage = (image) => ({
    type: UPDATE_IMAGE,
    image,
});

export const removeImage = (image) => ({
    type: REMOVE_IMAGE,
    image,
});

// /** Thunk Action Creators: */
export const getAllStoryimages = () => async (dispatch) => {
    const res = await fetch(`/api/stories/images`);

    if (res.ok) {
        const data = await res.json();
        dispatch(loadImages(data));
        return data;
    }
    return res;
};

export const getStoryimageDetails = (storyId) => async dispatch => {
    // console.log("Fetching stories' images for storyId:", storyId);
    const res = await fetch(`/api/stories/${storyId}/images`);

    if (res.ok) {
        const data = await res.json();
        dispatch(loadStoryImage(data));
        return data;
    }
    return res;
};

export const createStoryimage = (payload, storyId) => async (dispatch) => {
    const res = await fetch(`/api/stories/${storyId}/images`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(receiveImage(data));
        return data;
    }
    return res;
};

export const updateStoryimage = (image) => async (dispatch) => {
    const res = await fetch(`/api/stories/images/${image.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(image),
    });
    if (res.ok) {
        const data = await res.json();
        dispatch(editImage(data));
        return data;
    }
    return res;
};

export const deleteStoryimage = (imageId) => async (dispatch) => {
    const res = await fetch(`/api/stories/images/${imageId}`, {
        method: "DELETE",
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(removeImage(imageId));
        return data;
    }
    return res;
};

const storyimagesReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_IMAGES: {
            const storyimagesState = { ...state };
            action.images.storyimages.forEach((storyimage) => {
                if (!storyimagesState[storyimage.id]) { storyimagesState[storyimage.id] = storyimage; }
            });
            return {...storyimagesState};
        }
        case LOAD_STORYIMAGE: {
            const storyimagesState = { ...state };
            const Imagesstory = {};
            action.image.storyimages.forEach((image)=>{
                Imagesstory[image.id] = image;
            });
            return { ...storyimagesState, storyImage: Imagesstory };
        }
        case RECEIVE_IMAGE:
            return { ...state, [action.storyimage.id]: action.storyimage };
        case UPDATE_IMAGE:
            return { ...state };
        case REMOVE_IMAGE: {
            const storyimageState = { ...state };
            delete storyimageState[action.storyimage];
            return {...storyimageState};
        }
        default:
            return { ...state };
    }
};

export default storyimagesReducer;
