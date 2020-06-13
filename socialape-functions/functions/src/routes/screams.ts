import * as express from 'express';

import {firebaseAuth} from "../auth/firebaseAuth";

import {getScreams} from "../controllers/screams/getScreams";
import {createScream} from "../controllers/screams/createScream";
import {getScream} from "../controllers/screams/getScream";
import {commentOnScream} from "../controllers/screams/commentOnScream";

const router = express.Router();


// unprotected routes
router.get('/screams/:screamId', getScream);

// protected routes
router.get('/screams', firebaseAuth, getScreams);
router.post('/create-scream', firebaseAuth, createScream);
//TODO delete a scream
//TODO like a scream
//TODO unlike a scream
router.post('/screams/:screamId/comment', firebaseAuth, commentOnScream);


export default router;