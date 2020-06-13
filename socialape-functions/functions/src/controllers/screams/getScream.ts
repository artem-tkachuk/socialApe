import {Request, Response} from "express";
import db from "../../database/firestore";
import {Scream} from "../../interfaces/scream";

// @ts-ignore
export const getScream = (req: Request, res: Response) => {
    let screamData: Scream;

    db
        .collection(`screams`)
        .doc(req.params.screamId)
        .get()
        .then(doc => {
            if (!doc.exists) {
                return res.status(404).json({
                    error: `Scream not found`
                });
            } else {
                // @ts-ignore
                screamData = doc.data()!;
                screamData.screamId = doc.id;

                return db
                    .collection('comments')
                    .orderBy('createdAt', 'desc')
                    .where('screamId', '==', req.params.screamId)
                    .get()
                    .then(data => {
                        screamData.comments = [];

                        data.forEach(doc => {
                            // @ts-ignore
                            screamData.comments.push(doc.data());
                        });

                        return res.json(screamData);
                    })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err.code
            })
        })
};