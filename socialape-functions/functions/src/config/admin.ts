import * as admin from 'firebase-admin';

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

export default admin;


