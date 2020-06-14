import { Request, Response } from 'express';

import db from "../../database/firestore";

import {UserDetails} from "../../interfaces/userDetails";
import {Notification} from "../../interfaces/notification";


export const getAuthenticatedUser = (req: Request, res: Response) => {
    let userDetails: UserDetails = {};

    db
        .collection(`users`)
        // @ts-ignore
        .doc(req.user.handle)
        .get()
        // @ts-ignore
        .then(userDoc => {
            if (userDoc.exists) {
                // @ts-ignore
                userDetails.credentials = userDoc.data();
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

            return db
                .collection(`notifications`)
                // @ts-ignore
                .where('recipient', '==', req.user.handle)
                .orderBy('createdAt', 'desc')
                .limit(10)
                .get();
        })
        .then((notifications) => {
            userDetails.notifications = [];

            notifications.forEach(notification => {
               userDetails.notifications!.push({
                   sender: notification.data().sender,
                   recipient: notification.data().recipient,
                   createdAt: notification.data().createdAt,
                   read: notification.data().read,
                   type: notification.data().type,
                   screamId: notification.data().screamId
               });
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