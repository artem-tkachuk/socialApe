import * as express from 'express';

import {firebaseAuth} from "../auth/firebaseAuth";

import {getAllScreams} from "../controllers/screams/getAllScreams";
import {createScream} from "../controllers/screams/createScream";
import {getScream} from "../controllers/screams/getScream";
import {commentOnScream} from "../controllers/screams/commentOnScream";
import {likeScream} from "../controllers/screams/likeScream";
import {unlikeScream} from "../controllers/screams/unlikeScream";
import {deleteScream} from "../controllers/screams/deleteScream";

const router = express.Router();


// unprotected routes
router.get('/screams/:screamId', getScream);

// protected routes
router.get('/screams', firebaseAuth, getAllScreams);
router.post('/create-scream', firebaseAuth, createScream);
router.post(`/screams/:screamId/like`, firebaseAuth, likeScream);
router.post(`/screams/:screamId/unlike`, firebaseAuth, unlikeScream);
router.post('/screams/:screamId/comment', firebaseAuth, commentOnScream);
router.delete(`/screams/:screamId`, firebaseAuth, deleteScream);

export default router;