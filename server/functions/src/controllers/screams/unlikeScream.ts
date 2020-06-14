import {Request, Response} from "express";

import db from '../../database/firestore';

import {Scream} from "../../interfaces/scream";


// @ts-ignore
export const unlikeScream = async (req: Request, res: Response) => {
    try {
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

        const screamDocument = await screamDocumentRef.get();

        if (!screamDocument.exists) {
            return res.status(404).json({
                error: `This scream does not exist!`
            });
        } else {
            // @ts-ignore
            screamData = {
                ...screamDocument.data(),
                screamId: screamDocument.id
            };

            const likeDoc = await likeDocumentRef.get();

            if (likeDoc.empty) {
                return res.status(400).json({
                    error: `Scream not liked yet!`
                });
            } else {
                await db
                    .collection(`likes`)
                    // @ts-ignore
                    .doc(likeDoc.docs[0].id)
                    .delete();

                screamData.likeCount -= 1;

                await screamDocumentRef.update({
                    likeCount: screamData.likeCount
                });

                return res.json(screamData);
            }
        }
    } catch(err) {
        res.status(500).json({
            error: err.code
        });
    }
};