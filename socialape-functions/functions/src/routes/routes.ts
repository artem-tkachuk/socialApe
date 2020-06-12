import * as express from 'express';

import {getScreams} from "../controllers/getScreams";
import {createScream} from "../controllers/createScream";
import {signUp} from "../controllers/signup";
import {login} from "../controllers/login";
import {firebaseAuth} from "../auth/firebaseAuth";

const router = express.Router();

router.get('/screams', firebaseAuth, getScreams);
router.post('/create-scream', firebaseAuth, createScream);
router.post('/sign-up', signUp);
router.post('/login', login);

export default router;