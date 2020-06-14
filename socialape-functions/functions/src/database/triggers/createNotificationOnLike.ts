import db from "../firestore";
import {Notification} from "../../interfaces/notification";
import {QueryDocumentSnapshot} from "firebase-functions/lib/providers/firestore";

export const createNotificationOnLike = (likeDoc: QueryDocumentSnapshot) => {
    db
        .collection(`screams`)
        .doc(likeDoc.data().screamId)
        .get()
        .then(screamDoc => {
            const sender = likeDoc.data().userHandle;
            const recipient = screamDoc.data()!.userHandle;

            if (sender === recipient) {
                return;         //Don't send notifications to yourself about your own actions
            } else {
                if (screamDoc.exists) {
                    let newNotification: Notification = {
                        createdAt: new Date().toISOString(),
                        recipient,
                        sender,
                        type: 'like',
                        read: false,
                        screamId: screamDoc.id
                    };

                    return db
                        .collection(`notifications`)
                        .doc(likeDoc.id)
                        .set(newNotification);
                } else {
                    //we don't return any response since it is not an api, but just a database trigger
                    return;
                }
            }
        })
        .then(() => {
            //we don't return any response since it is not an api, but just a database trigger
            return;
        })
        .catch(err => {
            console.error(err);
            //we don't return any response since it is not an api, but just a database trigger
            return;
        })
};