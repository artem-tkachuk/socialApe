import { Request, Response } from 'express';

import db from "../../database/firestore";

import {UserDetails} from "../../interfaces/userDetails";

// @ts-ignore
export const getAuthenticatedUser = async (req: Request, res: Response) => {
    try {
        let userDetails: UserDetails = {};

        const userDoc = await db
            .collection(`users`)
            // @ts-ignore
            .doc(req.user.handle)
            .get();

        if (!userDoc.exists) {
             return res.status(404).json({
                 error: `This user does not exist!`
             });
        } else {
            // @ts-ignore
            userDetails.credentials = userDoc.data();
            const userLikesDocs = await db
                .collection('likes')
                // @ts-ignore
                .where('userHandle', '==', req.user.handle)
                .get();

            // @ts-ignore
            userDetails.likes = [];

            userLikesDocs!.forEach(userLikeDoc => {
                // @ts-ignore
                userDetails.likes.push(userLikeDoc.data());
            });

            const userNotificationsDocs = await db
                .collection(`notifications`)
                // @ts-ignore
                .where('recipient', '==', req.user.handle)
                .orderBy('createdAt', 'desc')
                .limit(10)
                .get();

            userDetails.notifications = [];

            userNotificationsDocs.forEach(notificationDoc => {
                userDetails.notifications!.push({
                    sender: notificationDoc.data().sender,
                    recipient: notificationDoc.data().recipient,
                    createdAt: notificationDoc.data().createdAt,
                    read: notificationDoc.data().read,
                    type: notificationDoc.data().type,
                    screamId: notificationDoc.data().screamId
                });
            });

            return res.json(userDetails);
        }
    } catch(err) {
        console.log(err);

        return res.status(500).json({
           error: err.code
        });
    }
};