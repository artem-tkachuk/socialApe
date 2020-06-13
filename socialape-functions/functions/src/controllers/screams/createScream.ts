import {Request, Response} from "express";
import db from "../../database/firestore";

// @ts-ignore
export const createScream = (req: Request, res: Response) => {

    if (req.body.body.trim() === ``) {
        return res.status(400).json({
            body: `Body must not be empty`
        });
    }

    db.collection('screams')
        .add({
            body: req.body.body,
            // @ts-ignore
            userHandle: req.user.handle,
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