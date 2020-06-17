import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI } from "../types";
import axios from "axios";

// @ts-ignore
export const loginUser = (userData: any, history: string[]) => async (dispatch) => {
    try {
        dispatch({
            type: LOADING_UI
        });

        const loginResponse = await axios.post('/login', userData);

        console.log(loginResponse.data);

        // store token if the page is refreshed
        const firebaseIdToken = `Bearer ${loginResponse.data.token}`;
        localStorage.setItem(`FirebaseIdToken`, firebaseIdToken);

        // set token as an authorization header so that we are authorized
        axios.defaults.headers.common['Authorization'] = firebaseIdToken;

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
        const userData = await axios.get('/user');

        dispath({
            type: SET_USER,
            payload: userData.data
        })
    } catch (err) {
        console.error(err);
    }
};