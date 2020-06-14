import db from "../firestore";

import {ChangeJson} from "firebase-functions";

//TODO test
export const onUserImageChange = async (change: ChangeJson) => {
    const dataBefore = change.before.data();
    const dataAfter = change.after.data();

    if (dataBefore.imageUrl !== dataAfter.imageUrl) {
        console.log(dataBefore.imageUrl);
        console.log(dataAfter.imageUrl);

        const batch = db.batch();

        const screamsDocs = await db
            .collection(`screams`)
            .where(`userHandle`, `==`, dataAfter.handle)
            .get();

        screamsDocs.forEach(screamDoc => {
            batch.update(screamDoc.ref, {
                userImage: dataAfter.imageUrl
            });
        });

        return await batch.commit();
    } else {
        return;
    }
};