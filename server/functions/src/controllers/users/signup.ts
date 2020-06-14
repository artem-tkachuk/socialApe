import {Request, Response} from "express";

import db from "../../database/firestore";

import firebase from "../../init/firebase";

import {validateNewUserData} from "../../util/validators";
import {firebaseConfig} from "../../config/firebase";

// @ts-ignore
export const signUp = async (req: Request, res: Response) => {
    try {
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

            const userDoc = await db
                .collection(`users`)
                .doc(newUser.handle)
                .get();


            if (userDoc.exists) {
                return res.status(400).json({
                    handle: `This handle is already taken!`
                }) //bad request
            } else {
                const authUserData = await firebase
                    .auth()
                    .createUserWithEmailAndPassword(newUser.email, newUser.password);

                // @ts-ignore
                userId = authUserData.user.uid;

                userToken = await authUserData.user!.getIdToken();

                const userCredentials = {
                    handle: newUser.handle,
                    email: newUser.email,
                    createdAt: new Date().toISOString(),
                    imageUrl: `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/${noImg}?alt=media`,
                    userId
                };

                await db
                    .collection(`users`)
                    .doc(newUser.handle)
                    .set(userCredentials);

                return res.status(201).json({userToken})
            }
        }
    } catch(err) {
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
    }
};