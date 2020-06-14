import db from "../../firestore";
import {Notification} from "../../../interfaces/notification";
import {QueryDocumentSnapshot} from "firebase-functions/lib/providers/firestore";

export const createNotificationOnComment = async (commentDoc: QueryDocumentSnapshot) => {
    try {
        const screamDoc = await db
            .collection(`screams`)
            .doc(commentDoc.data().screamId)
            .get();

            if (screamDoc.exists) {
                const sender = commentDoc.data().userHandle;
                const recipient = screamDoc.data()!.userHandle;

                if (sender === recipient) {
                    return;         //Don't send notifications to yourself about your own actions
                } else {
                    let newNotification: Notification = {
                        createdAt: new Date().toISOString(),
                        recipient,
                        sender,
                        type: 'comment',
                        read: false,
                        screamId: screamDoc.id
                    };

                    return await db
                        .collection(`notifications`)
                        .doc(commentDoc.id)
                        .set(newNotification);
                }
            } else {
                //we don't return any response since it is not an api, but just a database trigger
                return;
            }
    } catch(err) {
        console.error(err);
        //we don't return any response since it is not an api, but just a database trigger
        return;
    }
};