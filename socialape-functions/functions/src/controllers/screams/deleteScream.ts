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
        .then(screamDoc => {
            if (!screamDoc.exists) {
                return res.status(404).json({
                    error: `Scream not found!`
                })
                // @ts-ignore
            } else if (screamDoc.data()!.userHandle !== req.user.handle) {  //TODO implement same for other queries
                return res.status(403).json({
                    error: `Unauthorized`
                });
            } else {
                return screamDocumentRef.delete();
            }
        })
        .then(() => {
           return res.json({
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