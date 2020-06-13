import {Request, Response} from "express";
import db from "../../database/firestore";
import {Comment} from "../../interfaces/comment";

// @ts-ignore
export const commentOnScream = (req: Request, res: Response) => {
    if (req.body.body.trim() === ``) {
        return res.status(400).json({
            error: `Must not be empty`
        });
    } else {
        const newComment: Comment = {
            body: req.body.body,
            createdAt: new Date().toISOString(),
            screamId: req.params.screamId,
            // @ts-ignore
            userHandle: req.user.handle,
            // @ts-ignore
            userImage: req.user.imageUrl
        };

        db
            .collection(`screams`)
            .doc(req.params.screamId)
            .get()
            // @ts-ignore
            .then(doc => {
                if (!doc.exists) {
                    return res.status(404).json({
                        error: `Scream not found!`
                    })
                } else {
                    return doc.ref.update({
                        commentCount: doc.data()!.commentCount + 1
                    })
                }
            })
            .then(() => {
                return db
                    .collection(`comments`)
                    .add(newComment);
            })
            .then(() => {
                res.json(newComment);
            })
            .catch(err => {
                console.error(err);

                return res.status(500).json({
                    error: `Something went wrong!`
                })
            })
    }
};