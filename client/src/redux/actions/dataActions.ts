import { SET_SCREAMS, UNLIKE_SCREAM, LIKE_SCREAM, LOADING_DATA } from "../types";
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
