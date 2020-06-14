import {Request, Response} from "express";
import db from "../../database/firestore";
import {Scream} from "../../interfaces/scream";

// @ts-ignore
export const createScream = async (req: Request, res: Response) => {
    try {
        if (req.body.body.trim() === ``) {
            return res.status(400).json({
                body: `Body must not be empty`
            });
        }

        const newScream: Scream = {
            body: req.body.body,
            // @ts-ignore
            userHandle: req.user.handle,
            commentCount: 0,
            likeCount: 0,
            createdAt: new Date().toISOString(),
            // @ts-ignore
            userImage: req.user.imageUrl
        };

        const screamDoc = await db
            .collection('screams')
            .add(newScream);

        return res.json({
            ...newScream,
            screamId: screamDoc.id
        });
    }  catch(err) {
        console.error(err);

        return res.status(500).json({
            error: `Something went wrong!`
        });
    }
};