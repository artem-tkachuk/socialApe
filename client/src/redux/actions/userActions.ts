import {SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_UNAUTHENTICATED, LOADING_USER} from "../types";
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
export const getUserData = () => async (dispath) => {
    try {
        dispath({
            type: LOADING_USER
        });

        const userData = await axios.get('/user');

        dispath({
            type: SET_USER,
            payload: userData.data
        })
    } catch (err) {
        console.error(err);
    }
};

const setAuthorizationHeader = (token: string) => {
    // store token if the page is refreshed
    const firebaseIdToken = `Bearer ${token}`;
    localStorage.setItem(`firebaseIdToken`, firebaseIdToken);

    // set token as an authorization header so that we are authorized
    axios.defaults.headers.common['Authorization'] = firebaseIdToken;
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