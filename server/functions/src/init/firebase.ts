import * as firebase from "firebase";
import {firebaseConfig} from '../config/firebase';

firebase.initializeApp(firebaseConfig);

export default firebase;