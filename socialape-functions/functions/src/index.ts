// require('dotenv').config(); //load environmental variables

const functions = require('firebase-functions');
const admin = require('firebase-admin');    
const express = require('express');

const app = express();


// const serviceAccountPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
// const projectId = process.env.PROJECT_ID;

//const serviceAccount = require(serviceAccountPath);

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: `https://${projectId}.firebaseio.com`
// });

admin.initializeApp();

app.get('/screams', (req, res) => {
    admin.firestore().collection('screams')
        .orderBy('createdAt', 'desc')
        .get()
        .then(data => {
            let screams = [];
            
            data.forEach(doc => {
                screams.push({
                    screamId: doc.id,
                    body: doc.data().body,
                    userHandle: doc.data().userHandle,
                    createdAt: doc.data().createdAt
                });
            })

            return res.json(screams);
        })
        .catch(err => console.error(err));
});

app.post('/create-scream', (req, res) => {
    admin.firestore().collection('screams')
        .add({
            body: req.body.body,
            userHandle: req.body.userHandle,
            createdAt: new Date().toISOString()
        })
        .then(doc => {
            res.json({
                message: `Document ${doc.id} is created successfully!`
            })
        })
        .catch(err => {
            res.status(500).json({
                error: `Something went wrong!`
            })
            console.error(err); 
        })
})

// https://baseurl.com/api/...

exports.api = functions.https.onRequest(app);
