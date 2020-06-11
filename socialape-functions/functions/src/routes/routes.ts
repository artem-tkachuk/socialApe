import * as express from 'express';
import {createScream, getScreams, signUp} from "../controllers/screams";

const router = express.Router();

router.get('/screams', getScreams);
router.post('/create-scream', createScream);
router.post('/signup', signUp);

export default router;