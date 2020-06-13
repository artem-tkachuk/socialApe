import { Request, Response } from 'express';

import db from "../../database/firestore";
import {UserDetails} from "../../interfaces/userDetails";


export const getAuthenticatedUser = (req: Request, res: Response) => {
    let userDetails: UserDetails = {};

    db
        // @ts-ignore
        .doc(`/users/${req.user.handle}`)
        .get()
        // @ts-ignore
        .then(doc => {
            if (doc.exists) {
                // @ts-ignore
                userDetails.credentials = doc.data();
                return db
                    .collection('likes')
                    // @ts-ignore
                    .where('userHandle', '==', req.user.handle)
                    .get();
            } else {
                //TODO ???
            }
        })
        .then(data => {
            // @ts-ignore
            userDetails.likes = [];

            data!.forEach(doc => {
                // @ts-ignore
                userDetails.likes.push(doc.data());
            });

            return res.json(userDetails);
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({
               error: err.code
            });
        })
};