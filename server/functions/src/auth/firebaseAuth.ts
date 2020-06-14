import { Request, Response, NextFunction } from "express";
import admin from '../init/admin';

import db from '../database/firestore';

export const firebaseAuth = async (req: Request, res: Response, next: NextFunction) => {
    let decodedIdToken: string;
    let idToken: string;

    const authorization = req.headers.authorization!;

    if (authorization && authorization.startsWith(`Bearer`)) {
        idToken = authorization.split(`Bearer `)[1];
    } else {
        console.error(`No token found`);
        return res.status(403).json({
            error: `Unauthorized`
        });
    }

    try {
        // @ts-ignore
        decodedIdToken = await admin.auth().verifyIdToken(idToken);

        // @ts-ignore
        req.user = decodedIdToken;

        const userDoc = await db.collection(`users`)
                // @ts-ignore
                .where("userId", '==', req.user.uid)
                .limit(1)
                .get();

        // @ts-ignore
        req.user.handle = userDoc.docs[0].data().handle;
        // @ts-ignore
        req.user.imageUrl = userDoc.docs[0].data().imageUrl;

        return next();

    } catch (err) {
        console.error(`Error while verifying token`, err);
        return res.status(403).json(err);
    }
};