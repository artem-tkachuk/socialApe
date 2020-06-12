import * as express from 'express';
import {createScream, getScreams, login, signUp} from "../controllers/screams";

const router = express.Router();

router.get('/screams', getScreams);
router.post('/create-scream', createScream);
router.post('/signup', signUp);
router.post('/login', login);

export default router;