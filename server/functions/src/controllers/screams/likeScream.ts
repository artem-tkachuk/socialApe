import {Request, Response} from "express";

import db from '../../database/firestore';

import {Scream} from "../../interfaces/scream";
import {Like} from "../../interfaces/like";


// @ts-ignore
export const likeScream = async (req: Request, res: Response) => {
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

        const screamDoc = await screamDocumentRef
            .get();


        if (!screamDoc.exists) {
            return res.status(404).json({
                error: `This scream does not exist!`
            });
        } else {
            // @ts-ignore
            screamData = {
                ...screamDoc.data(),
                screamId: screamDoc.id
            };

            const likeDocument = await likeDocumentRef.get();

            if (likeDocument.empty) {

                const newLike : Like = {
                    screamId: req.params.screamId,
                    // @ts-ignore
                    userHandle: req.user.handle,
                    createdAt: new Date().toISOString()
                };

                await db
                    .collection(`likes`)
                    .add(newLike);

                screamData.likeCount += 1;

                await screamDocumentRef.update({
                    likeCount: screamData.likeCount
                });

                return res.json(screamData);

            } else {
                return res.status(400).json({
                    error: `Scream already liked`
                });
            }
        }
    } catch(err) {
        res.status(500).json({
            error: err.code
        });
    }
};