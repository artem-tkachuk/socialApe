import {Request, Response} from "express";

import db from '../../database/firestore';

import {Scream} from "../../interfaces/scream";


export const getAllScreams = (req: Request, res: Response) => {
    db.collection('screams')
        .orderBy('createdAt', 'desc')
        .get()
        .then(data => {
            let screams: Array<Scream> = [];

            data.forEach(doc => {
                screams.push({
                    screamId: doc.id,
                    body: doc.data().body,
                    userHandle: doc.data().userHandle,
                    createdAt: doc.data().createdAt,
                    commentCount: doc.data().commentCount,
                    likeCount: doc.data().likeCount,
                    userImage: doc.data().userImage
                });
            });

            return res.json(screams);
        })
        .catch(err => console.error(err));
};