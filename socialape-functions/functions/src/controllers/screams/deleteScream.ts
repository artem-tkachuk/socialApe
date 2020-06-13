import {Request, Response} from "express";
import db from "../../database/firestore";

// @ts-ignore
export const deleteScream = (req: Request, res: Response) => {
    const screamDocumentRef = db
        .collection(`screams`)
        .doc(req.params.screamId);

    screamDocumentRef
        .get()
        // @ts-ignore
        .then(async doc => {
            if (!doc.exists) {
                return res.status(404).json({
                    error: `Scream not found!`
                })
                // @ts-ignore
            } else if (doc.data()!.userHandle !== req.user.handle) {
                return res.status(403).json({
                    error: `Unauthorized`
                });
            } else {
                await screamDocumentRef.delete();

                // Delete all likes related to the deleted scream
                await db
                    .collection(`likes`)
                    .where(`screamId`, `==`, doc.id)
                    .get()
                    .then(docLikes => {
                        docLikes.forEach(async like => {
                            await like.ref.delete();
                        })
                    });

                //Delete all comments related to the deleted scream
                return await db
                    .collection(`comments`)
                    .where(`screamId`, `==`, doc.id)
                    .get()
                    .then(docComments => {
                        docComments.forEach(async comment => {
                            await comment.ref.delete();
                        })
                    })
            }
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