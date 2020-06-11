require('dotenv').config(); //load environmental variables

import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as firebase from 'firebase';
import routes from './routes/routes';

const app = express();

const ENV = process.env.ENV;

if (ENV === 'development') {
    const serviceAccountPath = process.env.GOOGLE_APPLICATION_CREDENTIALS!;
    const projectId = process.env.PROJECT_ID!;

    const serviceAccount = require(serviceAccountPath);

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: `https://${projectId}.firebaseio.com`
    });
} else {
    admin.initializeApp();
}

let firebaseConfig = {
    apiKey: "AIzaSyDrfv1DGQDpINNUHB7umaeRzO_JOLBuWmM",
    authDomain: "socialape-ea8b3.firebaseapp.com",
    databaseURL: "https://socialape-ea8b3.firebaseio.com",
    projectId: "socialape-ea8b3",
    storageBucket: "socialape-ea8b3.appspot.com",
    messagingSenderId: "416877167813",
    appId: "1:416877167813:web:e158ded363ba469d509cac",
    measurementId: "G-54PW0D0Y3N"
};
firebase.initializeApp(firebaseConfig);

app.use(routes);

exports.api = functions.https.onRequest(app);

// good practice: https://baseurl.com/api/...
