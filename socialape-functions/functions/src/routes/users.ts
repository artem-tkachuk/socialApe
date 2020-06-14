import * as express from 'express';

import {signUp} from "../controllers/users/signup";
import {login} from "../controllers/users/login";
import {uploadImage} from "../controllers/users/uploadImage";
import {firebaseAuth} from "../auth/firebaseAuth";
import {addUserDetails} from "../controllers/users/addUserDetails";
import {getAuthenticatedUser} from "../controllers/users/getAuthenticatedUser";
import {getUserDetails} from "../controllers/users/getUserDetails";
import {markNotificationsRead} from "../controllers/users/markNotificationsRead";

const router = express.Router();

router.post('/sign-up', signUp);
router.post('/login', login);
router.get('/user/:handle', getUserDetails);

//protected routes
router.post('/user/image', firebaseAuth, uploadImage);
router.post('/user', firebaseAuth, addUserDetails);
router.get('/user', firebaseAuth, getAuthenticatedUser);
router.post('/notifications', firebaseAuth, markNotificationsRead);

export default router;