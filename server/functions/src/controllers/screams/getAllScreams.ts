import {Request, Response} from "express";

import db from '../../database/firestore';

import {Scream} from "../../interfaces/scream";

// @ts-ignore
export const getAllScreams = async (req: Request, res: Response) => {
    try {
        const screamsDocs = await db.collection('screams')
            .orderBy('createdAt', 'desc')
            .get();

        let screams: Array<Scream> = [];

        screamsDocs.forEach(screamDoc => {
            screams.push({
                screamId: screamDoc.id,
                body: screamDoc.data().body,
                userHandle: screamDoc.data().userHandle,
                createdAt: screamDoc.data().createdAt,
                commentCount: screamDoc.data().commentCount,
                likeCount: screamDoc.data().likeCount,
                userImage: screamDoc.data().userImage
            });
        });

        return res.json(screams);
    } catch(err) {
        console.error(err)
    }
};