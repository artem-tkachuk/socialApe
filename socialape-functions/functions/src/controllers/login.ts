import {Request, Response} from "express";

import firebase from "../config/firebase";

import {validateLoginData} from "../util/util";


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
                console.error(err);

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