import {Request, Response} from "express";

import admin from '../config/admin';
import firebase from '../config/firebase';
import db from '../database/firestore';

import {Scream} from "../interfaces/scream";

import {validateLoginData, validateNewUserData} from "../util/util";



export const createScream = (req: Request, res: Response) => {
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
            });
            console.error(err);
        })
};

export const getScreams = (req: Request, res: Response) => {
    console.log('Here');
    admin.firestore().collection('screams')
        .orderBy('createdAt', 'desc')
        .get()
        .then(data => {
            let screams: Array<Scream> = [];

            data.forEach(doc => {
                screams.push({
                    screamId: doc.id,
                    body: doc.data().body,
                    userHandle: doc.data().userHandle,
                    createdAt: doc.data().createdAt,
                    commentCount: doc.data().commentCount,
                    likeCount: doc.data().likeCount
                });
            });

            return res.json(screams);
        })
        .catch(err => console.error(err));
};

// @ts-ignore
export const signUp = (req: Request, res: Response) => {

    const newUser = {
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        handle: req.body.handle,
    };

    //Data validation
    const errors = validateNewUserData(newUser);

    if (Object.keys(errors).length > 0) {
        return res.status(400).json(errors);
    } else {
        let userToken = ``, userId = ``;

        db.doc(`/users/${newUser.handle}`).get()
            // @ts-ignore
            .then(doc => {
                if (doc.exists) {
                    return res.status(400).json({
                        handle: `This handle is already taken!`
                    }) //bad request
                } else {
                    return firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password);
                }
            })
            .then(data => {
                // @ts-ignore
                userId = data.user.uid;
                // @ts-ignore
                return data.user.getIdToken();
            })
            .then(token => {
                userToken = token;

                const userCredentials = {
                    handle: newUser.handle,
                    email: newUser.email,
                    createdAt: new Date().toISOString(),
                    userId
                };

                return db.doc(`/users/${newUser.handle}`).set(userCredentials);
            })
            .then(() => {
                return res.status(201).json({ userToken })
            })
            .catch(err => {
                console.log(err);
                if (err.code === `auth/email-already-in-use`) {
                    return res.status(400).json({
                        email: `Email is already in use`
                    });
                } else {
                    return res.status(500).json({
                        error: err.code
                    })
                }
            });
    }
};

// @ts-ignore
export const login = (req: Request, res: Response) => {
    const loginUser = {
        email: req.body.email,
        password: req.body.password
    };

    const errors = validateLoginData(loginUser);

    if (Object.keys(errors).length > 0) {
        return res.status(400).json(errors);
    } else {
        firebase.auth().signInWithEmailAndPassword(loginUser.email, loginUser.password)
            .then(data => {
                return data.user!.getIdToken();
            })
            .then(token => {
                return res.json({ token });
            })
            .catch(err => {
                console.log(err);

                if (err.code === `auth/wrong-password`) {
                    return res.status(403).json({
                        general: `Wrong credentials. Please try again!`
                    })
                } else {
                    return res.status(500).json({
                        error: err.code
                    });
                }
            });
    }
};