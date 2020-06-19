import {
    SET_SCREAM,
    SET_SCREAMS,
    UNLIKE_SCREAM,
    LOADING_DATA,
    LIKE_SCREAM,
    DELETE_SCREAM,
    POST_SCREAM
} from "../types";

const initialState = {
    screams: [],
    scream: {},
    loading: false
};

// @ts-ignore
export default (state = initialState, action) => {
    let index;

    switch (action.type) {
        case LOADING_DATA:
            return {
                ...state,
                loading: true
            };

        case SET_SCREAMS:
            return {
                ...state,
                screams: action.payload,
                loading: false
            };

        case LIKE_SCREAM:
        case UNLIKE_SCREAM:
            // @ts-ignore
            index = state.screams.findIndex((scream) => scream.screamId === action.payload.screamId);

            // @ts-ignore
            state.screams[index] = action.payload;

            return {
                ...state
            };

        case DELETE_SCREAM:
            // @ts-ignore
            index = state.screams.findIndex(scream => scream.screamId === action.payload);
            state.screams.splice(index, 1);
            return {
                ...state
            };

        case POST_SCREAM:
            return {
                ...state,
                screams: [
                    action.payload,
                    ...state.screams
                ]
            };

        default:
            return {
                ...state
            };
    }
};