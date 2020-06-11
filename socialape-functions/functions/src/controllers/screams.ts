import {Request, Response} from "express";
import * as admin from "firebase-admin";
import {Scream} from "../interfaces/scream";

export const createScream = (req: Request, res: Response) => {
    admin.firestore().collection('screams')
        .add({
            body: req.body.body,
            userHandle: req.body.userHandle,
            createdAt: new Date().toISOString()
        })
        .then(doc => {
            res.json({
                message: `Document ${doc.id} is created successfully!`
            })
        })
        .catch(err => {
            res.status(500).json({
                error: `Something went wrong!`
            });
            console.error(err);
        })
};

export const getScreams = (req: Request, res: Response) => {
    console.log('Here');
    admin.firestore().collection('screams')
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
                    likeCount: doc.data().likeCount
                });
            });

            return res.json(screams);
        })
        .catch(err => console.error(err));
};

export const signUp = (req: Request, res: Response) => {

};