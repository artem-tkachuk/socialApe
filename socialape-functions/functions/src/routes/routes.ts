import * as express from 'express';

import {getScreams} from "../controllers/getScreams";
import {createScream} from "../controllers/createScream";
import {signUp} from "../controllers/signup";
import {login} from "../controllers/login";

const router = express.Router();

router.get('/screams', getScreams);
router.post('/create-scream', createScream);
router.post('/signup', signUp);
router.post('/login', login);

export default router;