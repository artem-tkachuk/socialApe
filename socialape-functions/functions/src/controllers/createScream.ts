import {Request, Response} from "express";
import admin from "../config/admin";

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