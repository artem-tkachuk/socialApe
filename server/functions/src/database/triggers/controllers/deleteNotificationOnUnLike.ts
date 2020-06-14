import db from "../../firestore";

import {QueryDocumentSnapshot} from "firebase-functions/lib/providers/firestore";

export const deleteNotificationOnUnLike = async (unlikeDoc: QueryDocumentSnapshot) => {
    try {
        return await db
            .collection(`notifications`)
            .doc(unlikeDoc.id)
            .delete();
    } catch(err) {
        console.error(err);
        return;
    }
};