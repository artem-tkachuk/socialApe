import {Request, Response} from "express";

import db from '../../database/firestore';

import {Scream} from "../../interfaces/scream";
import {Like} from "../../interfaces/like";


export const likeScream = (req: Request, res: Response) => {
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

               const newLike : Like = {
                   screamId: req.params.screamId,
                       // @ts-ignore
                   userHandle: req.user.handle,
                   createdAt: new Date().toISOString()
               };

               return db
                   .collection(`likes`)
                   .add(newLike)
                   .then(() => {
                       screamData.likeCount += 1;
                       return screamDocumentRef.update({
                           likeCount: screamData.likeCount
                       })
                   })
                   .then(() => {
                       return res.json(screamData);
                   })
           } else {
               return res.status(400).json({
                   error: `Scream already liked`
               });
           }
        })
        .catch(err => {
            res.status(500).json({
                error: err.code
            });
        })
};