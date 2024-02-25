// /** Action Type Constants: */
export const LOAD_IMAGES = "placeimages/LOAD_IMAGES";
export const LOAD_PLACEIMAGE = "placeimages/LOAD_PLACEIMAGE";
export const RECEIVE_IMAGE = "placeimages/RECEIVE_IMAGE";
export const UPDATE_IMAGE = "placeimages/UPDATE_IMAGE";
export const REMOVE_IMAGE = "placeimages/REMOVE_IMAGE";

// /**  Action Creators: */
export const loadImages = (images) => ({
    type: LOAD_IMAGES,
    images,
});

export const loadPlaceImage = (image) => ({
    type: LOAD_PLACEIMAGE,
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
export const getAllPlaceimages = () => async (dispatch) => {
    const res = await fetch(`/api/places/images`);

    if (res.ok) {
        const data = await res.json();
        dispatch(loadImages(data));
        return data;
    }
    return res;
};

export const getPlaceimageDetails = (placeId) => async dispatch => {
    // console.log("Fetching places' images for placeId:", placeId);
    const res = await fetch(`/api/places/${placeId}/images`);

    if (res.ok) {
        const data = await res.json();
        dispatch(loadPlaceImage(data));
        return data;
    }
    return res;
};

export const createPlaceimage = (payload, placeId) => async (dispatch) => {
    const res = await fetch(`/api/places/${placeId}/images`, {
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

export const updatePlaceimage = (image) => async (dispatch) => {
    const res = await fetch(`/api/places/images/${image.id}`, {
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

export const deletePlaceimage = (imageId) => async (dispatch) => {
    const res = await fetch(`/api/places/images/${imageId}`, {
        method: "DELETE",
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(removeImage(imageId));
        return data;
    }
    return res;
};

const placeimagesReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_IMAGES: {
            const placeimagesState = { ...state };
            action.images.placeimages.forEach((placeimage) => {
                if (!placeimagesState[placeimage.id]) { placeimagesState[placeimage.id] = placeimage; }
            });
            return {...placeimagesState};
        }
        case LOAD_PLACEIMAGE: {
            return { ...state, [action.placeimage.id]: action.placeimage };
        }
        case RECEIVE_IMAGE:
            return { ...state, [action.placeimage.id]: action.placeimage };
        case UPDATE_IMAGE:
            return { ...state };
        case REMOVE_IMAGE: {
            const placeimageState = { ...state };
            delete placeimageState[action.placeimage];
            return {...placeimageState};
        }
        default:
            return { ...state };
    }
};

export default placeimagesReducer;
