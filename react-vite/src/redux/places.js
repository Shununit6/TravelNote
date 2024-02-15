// /** Action Type Constants: */
export const LOAD_PLACES = "places/LOAD_PLACES";
export const LOAD_PLACE_DETAILS = "places/LOAD_PLACE_DETAILS";
export const RECEIVE_PLACE = "places/RECEIVE_PLACE";
export const UPDATE_PLACE = "places/UPDATE_PLACE";
export const REMOVE_PLACE = "places/REMOVE_PLACE";

// /**  Action Creators: */
export const loadPlaces = (places) => ({
    type: LOAD_PLACES,
    places,
});

export const loadPlaceDetails = (place) => ({
    type: LOAD_PLACE_DETAILS,
    place,
});

export const receivePlace = (place) => ({
    type: RECEIVE_PLACE,
    place,
});

export const editPlace = (place) => ({
    type: UPDATE_PLACE,
    place,
});

export const removePlace = (place) => ({
    type: REMOVE_PLACE,
    place,
});

// /** Thunk Action Creators: */
export const getAllPlaces = () => async (dispatch) => {
    const res = await fetch(`/api/places`);

    if (res.ok) {
        const data = await res.json();
        // console.log("data", data);
        dispatch(loadPlaces(data));
        return data;
    }
    return res;
};

export const getPlaceDetails = (placeId) => async dispatch => {
    // console.log("Fetching place details for placeId:", placeId);
    const res = await fetch(`/api/places/${placeId}`);

    if (res.ok) {
        const data = await res.json();
        // console.log("Received data:", data);
        dispatch(loadPlaceDetails(data));
        return data;
    }
    // console.log("Error fetching place details:", res.statusText);
    return res;
};

export const getMyPlaces = () => async (dispatch) => {
    const res = await fetch('/api/places/current');
    if (res.ok) {
        const data = await res.json();
        dispatch(loadPlaces(data));
        return data;
    }
    return res;
};

export const createPlace = (payload) => async (dispatch) => {
    const res = await fetch("/api/places/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(receivePlace(data));
        return data;
    }
    return res;
};

export const updatePlace = (place) => async (dispatch) => {
    const res = await fetch(`/api/places/${place.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(place),
    });
    if (res.ok) {
        const data = await res.json();
        dispatch(editPlace(data));
        return data;
    }
    return res;
};

export const deletePlace = (placeId) => async (dispatch) => {
    const res = await fetch(`/api/places/${placeId}`, {
        method: "DELETE",
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(removePlace(placeId));
        return data;
    }
    return res;
};

const placesReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_PLACES: {
            const placesState = { ...state };
            action.places.places.forEach((place) => {
                if (!placesState[place.id]) { placesState[place.id] = place; }
            });
            return {...placesState};
        }
        case LOAD_PLACE_DETAILS: {
            return { ...state, [action.place.id]: action.place };
        }
        case RECEIVE_PLACE:
            return { ...state, [action.place.id]: action.place };
        case UPDATE_PLACE:
            return { ...state };
        case REMOVE_PLACE: {
            const placeState = { ...state };
            delete placeState[action.place];
            return {...placeState};
        }
        default:
            return { ...state };
    }
};

export default placesReducer;
