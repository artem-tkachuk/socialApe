import {Request, Response} from "express";
import db from "../../database/firestore";
import {Scream} from "../../interfaces/scream";

// @ts-ignore
export const getScream = async (req: Request, res: Response) => {
    try {
        let screamData: Scream;

        const screamDoc = await db
            .collection(`screams`)
            .doc(req.params.screamId)
            .get();

        if (!screamDoc.exists) {
            return res.status(404).json({
                error: `Scream not found`
            });
        } else {
            // @ts-ignore
            screamData = screamDoc.data()!;
            screamData.screamId = screamDoc.id;

            const screamComments = await db
                .collection('comments')
                .orderBy('createdAt', 'desc')
                .where('screamId', '==', req.params.screamId)
                .get();

            screamData.comments = [];

            screamComments.forEach(comments => {
                // @ts-ignore
                screamData.comments.push(comments.data());
            });

            return res.json(screamData);
        }
    } catch(err) {
        console.log(err);

        res.status(500).json({
            error: err.code
        })
    }
};