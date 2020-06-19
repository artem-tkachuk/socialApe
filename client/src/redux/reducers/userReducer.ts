import {SET_USER, SET_AUTHENTICATED, SET_UNAUTHENTICATED, LOADING_USER, LIKE_SCREAM, UNLIKE_SCREAM} from "../types";

const initialState = {
    authenticated: false,
    credentials: {},
    likes: [],
    loading: false,
    notification: []
};

// @ts-ignore
export default  (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: true
            };

        case SET_UNAUTHENTICATED:
            return initialState;

        case SET_USER:
            return {
                authenticated: true,
                ...action.payload
            };
        case LOADING_USER:
            return {
                ...state,
                loading: true
            };
        case LIKE_SCREAM:
            return {
                ...state,
                likes: [
                    ...state.likes,
                    {
                        // @ts-ignore
                        userHandle: state.credentials.handle,
                        screamId: action.payload.screamId
                    }
                ]
            };
        case UNLIKE_SCREAM:
            return {
                ...state,
                // @ts-ignore
                likes: state.likes.filter(like => like.screamId !== action.payload.screamId)
            };
        default:
            return state;
    }
};