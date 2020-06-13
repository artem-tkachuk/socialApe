import { Request, Response, NextFunction } from "express";
import admin from "../init/admin";
import db from '../database/firestore';

// @ts-ignore
export const firebaseAuth = (req: Request, res: Response, next: NextFunction) => {
    let idToken: string;

    const auth = req.headers.authorization;

    if (auth && auth.startsWith(`Bearer`)) {
        idToken = auth.split(`Bearer `)[1];
    } else {
        console.error(`No token found`);
        return res.status(403).json({
           error: `Unauthorized`
        });
    }

    admin.auth().verifyIdToken(idToken)
        .then(decodedIdToken => {
            // @ts-ignore
            req.user = decodedIdToken;
            return db.collection(`users`)
                // @ts-ignore
                .where("userId", '==', req.user.uid)
                .limit(1)
                .get()
        })
        .then(data => {
            // @ts-ignore
            req.user.handle = data.docs[0].data().handle;
            // @ts-ignore
            req.user.imageUrl = data.docs[0].data().imageUrl;

            return next();
        })
        .catch(err => {
            console.error(`Error while verifying token`, err);
            return res.status(403).json(err);
        })
};