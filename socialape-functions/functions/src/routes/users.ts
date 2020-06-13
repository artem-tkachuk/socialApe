import * as express from 'express';

import {signUp} from "../controllers/users/signup";
import {login} from "../controllers/users/login";
import {uploadImage} from "../controllers/users/uploadImage";
import {firebaseAuth} from "../auth/firebaseAuth";
import {addUserDetails} from "../controllers/users/addUserDetails";
import {getAuthenticatedUser} from "../controllers/users/getAuthenticatedUser";

const router = express.Router();

router.post('/sign-up', signUp);
router.post('/login', login);
router.post('/user/image', firebaseAuth, uploadImage);  //protected route
router.post('/user', firebaseAuth, addUserDetails);
router.get('/user', firebaseAuth, getAuthenticatedUser);

export default router;