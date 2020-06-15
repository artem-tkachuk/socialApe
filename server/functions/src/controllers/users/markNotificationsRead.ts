import { Request, Response } from "express";
import db from "../../database/firestore";

// @ts-ignore
export const markNotificationsRead = async (req: Request, res: Response) => {
    try {
        const batch = db.batch();

        // @ts-ignore
        const notificationRefs = Object.values(req.body).map(notificationId => db.collection(`notifications`).doc(notificationId));

        const notificationDocs = await db.getAll(...notificationRefs);

        notificationDocs.forEach(notificationDoc => {
            // @ts-ignore
            if (notificationDoc.exists && req.user.handle === notificationDoc.data()!.recipient) {
                batch.update(notificationDoc.ref, { read: true });
            }
        });

        await batch.commit();

        res.json({
            message: `All notifications that exist and ones you have access to are marked read!`
        });
    } catch(err) {
        console.error(err);

        return res.status(500).json({
            error: err.code
        });
    }
};