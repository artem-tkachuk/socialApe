import db from "../../firestore";

import {QueryDocumentSnapshot} from "firebase-functions/lib/providers/firestore";
import {EventContext} from "firebase-functions";

export const onScreamDeleted = async (deletedScreamDoc: QueryDocumentSnapshot, context: EventContext) => {
    const screamId = context.params.id;

    const batch = db.batch();

    try {
        //delete all related comments
        let commentsDocs = await db
            .collection(`comments`)
            .where(`screamId`, `==`, screamId)
            .get();

        commentsDocs.forEach(commentDoc => batch.delete(commentDoc.ref));


        //delete all related likes
        let likesDocs = await db
            .collection(`likes`)
            .where(`screamId`, `==`, screamId)
            .get();

        likesDocs.forEach(likeDoc => batch.delete(likeDoc.ref));


        //deleted all related notifications
        let notificationsDocs = await db
            .collection(`notifications`)
            .where(`screamId`, `==`, screamId)
            .get();

        notificationsDocs.forEach(notificationsDoc => batch.delete(notificationsDoc.ref));

        return await batch.commit();

    } catch (err) {
        console.error(err);
        return true;
    }
};
