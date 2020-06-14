import db from "../firestore";

import {QueryDocumentSnapshot} from "firebase-functions/lib/providers/firestore";

export const deleteNotificationOnUnLike = (unlikeDoc: QueryDocumentSnapshot) => {
    return db
        .collection(`notifications`)
        .doc(unlikeDoc.id)
        .delete()
        .catch(err => {
            console.error(err);
            return;
        })
};