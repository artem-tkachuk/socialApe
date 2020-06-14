import {Request, Response} from "express";

import db from "../../database/firestore";

import firebase from "../../init/firebase";

import {validateNewUserData} from "../../util/validators";
import {firebaseConfig} from "../../config/firebase";

// @ts-ignore
export const signUp = (req: Request, res: Response) => {

    const newUser = {
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        handle: req.body.handle,
    };

    //Data validation
    const { errors, valid }  = validateNewUserData(newUser);

    if (!valid) {
        return res.status(400).json(errors);
    } else {

        const noImg = `no-img.png`;

        let userToken = ``, userId = ``;

        db.doc(`/users/${newUser.handle}`).get()
            // @ts-ignore
            .then(doc => {
                if (doc.exists) {
                    return res.status(400).json({
                        handle: `This handle is already taken!`
                    }) //bad request
                } else {
                    return firebase
                        .auth()
                        .createUserWithEmailAndPassword(newUser.email, newUser.password);
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
                    imageUrl: `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/${noImg}?alt=media`,
                    userId
                };

                return db
                    .doc(`/users/${newUser.handle}`)
                    .set(userCredentials);
            })
            .then(() => {
                return res.status(201).json({ userToken })
            })
            .catch(err => {
                console.error(err);
                if (err.code === `auth/email-already-in-use`) {
                    return res.status(400).json({
                        email: `Email is already in use!`
                    });
                } else {
                    return res.status(500).json({
                        general: `Something went wrong! Please try again!`
                    })
                }
            });
    }
};