import {SET_USER, SET_AUTHENTICATED, SET_UNAUTHENTICATED, LOADING_USER} from "../types";

const initialState = {
    authenticated: false,
    credentials: {},
    likes: [],
    loading: false,
    notification: []
};

export default  (state = initialState, action: { type: any; payload: any; }) => {
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
        default:
            return state;
    }
};