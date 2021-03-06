import {
    SET_USER,
    SET_ERRORS,
    CLEAR_ERRORS,
    LOADING_UI,
    SET_UNAUTHENTICATED,
    LOADING_USER,
    MARK_NOTIFICATIONS_READ
} from "../types";
import axios from "axios";

// @ts-ignore
export const loginUser = (userData: any, history: string[]) => async (dispatch) => {
    try {
        dispatch({
            type: LOADING_UI
        });

        const loginResponse = await axios.post('/login', userData);

        console.log(loginResponse.data);

        setAuthorizationHeader(loginResponse.data.token);

        dispatch(getUserData());
        dispatch({
            type: CLEAR_ERRORS
        });

        history.push('/');
    } catch (err) {
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        });
    }
};

// @ts-ignore
export const signUpUser = (newUserData: any, history: string[]) => async (dispatch) => {
    try {
        dispatch({
            type: LOADING_UI
        });

        const loginResponse = await axios.post('/sign-up', newUserData);

        console.log(loginResponse.data);

        setAuthorizationHeader(loginResponse.data.token);

        dispatch(getUserData());
        dispatch({
            type: CLEAR_ERRORS
        });

        history.push('/');
    } catch (err) {
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        });
    }
};


// @ts-ignore
export const getUserData = () => async (dispatch) => {
    try {
        dispatch({
            type: LOADING_USER
        });

        const userData = await axios.get('/user');

        dispatch({
            type: SET_USER,
            payload: userData.data
        })
    } catch (err) {
        console.error(err);
    }
};

// @ts-ignore
export const logOutUser = () => (dispatch) => {
    localStorage.removeItem('firebaseIdToken');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({
        type: SET_UNAUTHENTICATED
    });
};

// @ts-ignore
export const uploadImage = (formData) => async (dispatch) =>{
    try {
        dispatch({
            type: LOADING_USER
        });

        await axios.post('/user/image', formData);

        dispatch(getUserData());
    } catch (err) {
        console.error(err);
    }
};


// @ts-ignore
export const editUserDetails = (userDetails) => async (dispatch) => {
    try {
        dispatch({
            type: LOADING_USER
        });

        await axios.post('/user', userDetails);

        dispatch(getUserData());
    } catch (err) {
        console.error(err);
    }
};

// @ts-ignore
export const markNotificationsRead = (notificationsIds) => async dispatch => {
    try {
        await axios.post('/notifications', notificationsIds);

        dispatch({
            type: MARK_NOTIFICATIONS_READ
        });
    } catch (e) {
        console.error(e);
    }
};


//helper function
const setAuthorizationHeader = (token: string) => {
    // store token if the page is refreshed
    const firebaseIdToken = `Bearer ${token}`;
    localStorage.setItem(`firebaseIdToken`, firebaseIdToken);

    // set token as an authorization header so that we are authorized
    axios.defaults.headers.common['Authorization'] = firebaseIdToken;
};