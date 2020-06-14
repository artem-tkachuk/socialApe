import {Request, Response} from "express";

import db from '../../database/firestore';

import {Scream} from "../../interfaces/scream";


export const unlikeScream = (req: Request, res: Response) => {
    const likeDocumentRef = db
        .collection(`likes`)
        // @ts-ignore
        .where('userHandle', '==', req.user.handle)
        .where('screamId', '==', req.params.screamId)
        .limit(1);

    const screamDocumentRef = db
        .collection(`screams`)
        .doc(req.params.screamId);

    let screamData: Scream;

    screamDocumentRef
        .get()
        // @ts-ignore
        .then(doc => {
            if (doc.exists) {
                // @ts-ignore
                screamData = {
                    ...doc.data(),
                    screamId: doc.id
                };

                return likeDocumentRef
                    .get();
            } else {
                return res.status(404).json({
                    error: `This scream does not exist!`
                });
            }
        })
        // @ts-ignore
        .then(data => {
            // @ts-ignore
            if (data.empty) {
                return res.status(400).json({
                    error: `Scream not liked yet!`
                });
            } else {
                return db
                    .collection(`likes`)
                    // @ts-ignore
                    .doc(data.docs[0].id)
                    .delete()
                    .then(() => {
                        screamData.likeCount -= 1;
                        return screamDocumentRef.update({
                            likeCount: screamData.likeCount
                        })
                    })
                    .then(() => {
                        return res.json(screamData);
                    })
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err.code
            });
        })
};