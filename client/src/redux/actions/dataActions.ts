import {
    SET_SCREAMS,
    UNLIKE_SCREAM,
    LIKE_SCREAM,
    LOADING_DATA,
    DELETE_SCREAM,
    LOADING_UI,
    SET_ERRORS,
    CLEAR_ERRORS,
    POST_SCREAM,
    SET_SCREAM,
    STOP_LOADING_UI,
    SUBMIT_COMMENT
} from '../types';
import axios from "axios";

// Get all screams
// @ts-ignore
export const getScreams = () => async (dispatch) => {
    try {
        dispatch({
            type: LOADING_DATA
        });

        const screamsDocs = await axios.get('/screams');

        dispatch({
           type: SET_SCREAMS,
           payload: screamsDocs.data
        });

    } catch (err) {
        dispatch({
            type: SET_SCREAMS,
            payload: []
        });
    }
};

// Get a single scream
// @ts-ignore
export const getScream = (screamId: string) => async (dispatch) => {
    try {
        dispatch({
            type: LOADING_UI
        });

        const screamResponse = await axios.get(`/screams/${screamId}`);

        dispatch({
            type: SET_SCREAM,
            payload: screamResponse.data
        });

        dispatch({
            type: STOP_LOADING_UI
        })
    } catch (err) {
        console.error(err);
    }
};

// Post a scream
// @ts-ignore
export const postScream = (newScream) => async (dispatch) => {
    try {
        dispatch({
            type: LOADING_UI
        });

        const createScreamResponse = await axios.post(`/create-scream`, newScream );

        dispatch({
            type: POST_SCREAM,
            payload: createScreamResponse.data
        });

        dispatch({
            type: CLEAR_ERRORS
        });

    } catch (err) {
        console.error(err);

        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        });
    }
};

// Like a scream
// @ts-ignore
export const likeScream = (screamId: string) => async (dispatch) => {
    try {
        const likeResponse = await axios.post(`/screams/${screamId}/like`);

        dispatch({
            type: LIKE_SCREAM,
            payload: likeResponse.data
        });
    } catch (err) {
        console.error(err);
    }
};

// Unlike a scream
// @ts-ignore
export const unlikeScream = (screamId: string) => async (dispatch) => {
    try {
        const unlikeResponse = await axios.post(`/screams/${screamId}/unlike`);

        dispatch({
            type: UNLIKE_SCREAM,
            payload: unlikeResponse.data
        });
    } catch (err) {
        console.error(err);
    }
};

// Submit a comment
// @ts-ignore
export const submitComment = (screamId, commentData) => async (dispatch) => {
    try {
        const postCommentResponse = await axios.post(`screams/${screamId}/comment`, commentData);

        dispatch({
            type: SUBMIT_COMMENT,
            payload: postCommentResponse.data
        });

        dispatch(clearErrors());
    } catch (err) {

        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        });
    }
};

// Delete a scream
// @ts-ignore
export const deleteScream = (screamId: string) => async (dispatch) => {
    try {
        await axios.delete(`/screams/${screamId}`);

        dispatch({
            type: DELETE_SCREAM,
            payload: screamId
        });
    } catch (err) {
        console.error(err);
    }
};

// Get user data for displaying the profile page
// @ts-ignore
export const getUserProfileData = (userHandle: string) => async dispatch => {
    try {
        dispatch({
            type: LOADING_DATA
        });

        const getUserProfileDataResponse = await axios.get(`/user/${userHandle}`);

        dispatch({
            type: SET_SCREAMS,
            payload: getUserProfileDataResponse.data.screams
        });
    } catch (err) {
        dispatch({
            type: SET_SCREAMS,
            payload: null
        })
    }
};

// Clear errors. An example of actions creator
// @ts-ignore
export const clearErrors = () => (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    });
};