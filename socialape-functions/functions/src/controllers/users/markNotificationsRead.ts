import { Request, Response } from "express";
import db from "../../database/firestore";

export const markNotificationsRead = (req: Request, res: Response) => {
    let batch = db.batch();

    req.body.forEach((notificationId: string) => {
        const notificationDocRef = db
            .collection(`notifications`)
            .doc(notificationId);

        batch.update(notificationDocRef, {
            read: true
        });
    });

    batch
        .commit()
        .then(() => {
            res.json({
                message: `Notifications marked read!`
            });
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({
                error: err.code
            });
        });
};