import {Request, Response} from "express";

import db from "../database/firestore";

import firebase from "../config/firebase";

import {validateNewUserData} from "../util/util";

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
                console.error(err);
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