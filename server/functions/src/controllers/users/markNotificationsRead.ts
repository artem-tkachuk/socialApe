import { Request, Response } from "express";
import db from "../../database/firestore";

// @ts-ignore
export const markNotificationsRead = async (req: Request, res: Response) => {
    try {
        const batch = db.batch();

        req.body.forEach((notificationId: string) => {
            const notificationDocRef = db
                .collection(`notifications`)
                .doc(notificationId);

            batch.update(notificationDocRef, {
                read: true
            });
        });

        await batch.commit();

        res.json({
            message: `Notifications marked read!`
        });
    } catch(err) {
        console.error(err);

        return res.status(500).json({
            error: err.code
        });
    }
};