import {Request, Response} from "express";

import firebase from "../../init/firebase";

import {validateLoginData} from "../../util/validators";


// @ts-ignore
export const login = async (req: Request, res: Response) => {
    try {
        const loginUser = {
            email: req.body.email,
            password: req.body.password
        };

        const {errors, valid} = validateLoginData(loginUser);

        if (!valid) {
            return res.status(400).json(errors);
        } else {
            const userDoc = await firebase
                .auth()
                .signInWithEmailAndPassword(loginUser.email, loginUser.password);

            const token = await userDoc.user!.getIdToken();

            return res.json({token});
        }
    } catch(err) {
        console.error(err);

        // auth/wrong-password
        // auth/user-not-found -- not recommended

        return res.status(403).json({
            general: `Wrong credentials. Please try again!`
        });
    }
};