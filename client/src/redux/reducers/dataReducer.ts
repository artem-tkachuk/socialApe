import {SET_SCREAM, SET_SCREAMS, UNLIKE_SCREAM, LOADING_DATA, LIKE_SCREAM} from "../types";

const initialState = {
    screams: [],
    scream: {},
    loading: false
};

// @ts-ignore
export default (state = initialState, action) => {
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
            let index = state.screams.findIndex((scream) => scream.screamId === action.payload.screamId);

            // @ts-ignore
            state.screams[index] = action.payload;

            return {
                ...state
            };
        default:
            return {
                ...state
            };
    }
};