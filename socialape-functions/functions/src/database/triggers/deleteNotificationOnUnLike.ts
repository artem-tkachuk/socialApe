import db from "../firestore";

import {QueryDocumentSnapshot} from "firebase-functions/lib/providers/firestore";

export const createNotificationOnUnLike = (unlikeDoc: QueryDocumentSnapshot) => {
    db
        .collection(`notifications`)
        .doc(unlikeDoc.id)
        .delete()
        .then(() => {
            return;
        })
        .catch(err => {
            console.error(err);
            return;
        })
};