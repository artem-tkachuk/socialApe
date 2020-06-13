import * as admin from 'firebase-admin';
import * as dotenv from 'dotenv';

const loadEnvSuccess = dotenv.config({ path: `../.env`}); //load environmental variables

if (loadEnvSuccess.error) { // deploy
    admin.initializeApp();
} else {                    // serve
    const serviceAccountPath = process.env.GOOGLE_APPLICATION_CREDENTIALS!;
    const projectId = process.env.PROJECT_ID!;

    const serviceAccount = require(serviceAccountPath);

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: `https://${projectId}.firebaseio.com`
    });
}

export default admin;


