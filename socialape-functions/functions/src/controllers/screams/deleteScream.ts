import {Request, Response} from "express";
import db from "../../database/firestore";
import {Scream} from "../../interfaces/scream";

// @ts-ignore
export const deleteScream = (req: Request, res: Response) => {
    const screamDocumentRef = db
        .collection(`screams`)
        .doc(req.params.screamId);

    let screamDocument: FirebaseFirestore.DocumentData; //temp variable to use it in the nested .then() call

    let batch = db.batch();

    screamDocumentRef
        .get()
        .then(async screamDoc => {
            if (!screamDoc.exists) {
                return res.status(404).json({
                    error: `Scream not found!`
                })
                // @ts-ignore
            } else if (screamDoc.data()!.userHandle !== req.user.handle) {
                return res.status(403).json({
                    error: `Unauthorized`
                });
            } else {
                await screamDocumentRef.delete();

                screamDocument = screamDoc;

                // Delete all likes related to the deleted scream
                return db
                    .collection(`likes`)
                    .where(`screamId`, `==`, screamDoc.id)
                    .get();
            }
        })
        .then(docLikes => {
            // @ts-ignore
            docLikes.forEach(docLike => {
                batch.delete(docLike.ref);
            });

            return;
        })
        .then(() => {
            //Delete all comments related to the deleted scream
            return db
                .collection(`comments`)
                .where(`screamId`, `==`, screamDocument.id)
                .get();
        })
        .then(docComments => {
            docComments.forEach(async commentDoc => {
                batch.delete(commentDoc.ref);
            })
        })
        .then(() => {
            return batch.commit();
        })
        .then(() => {
           res.json({
               message: `Scream deleted successfully!`
           });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                error: err.code
            });
        });
};