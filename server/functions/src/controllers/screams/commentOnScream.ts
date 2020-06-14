import {Request, Response} from "express";
import db from "../../database/firestore";
import {Comment} from "../../interfaces/comment";

// @ts-ignore
export const commentOnScream = async (req: Request, res: Response) => {
    if (req.body.body.trim() === ``) {
        return res.status(400).json({
            comment: `Must not be empty`
        });
    } else {
        try {
            const newComment: Comment = {
                body: req.body.body,
                createdAt: new Date().toISOString(),
                screamId: req.params.screamId,
                // @ts-ignore
                userHandle: req.user.handle,
                // @ts-ignore
                userImage: req.user.imageUrl
            };

            const screamDoc = await db
                .collection(`screams`)
                .doc(req.params.screamId)
                .get();


            if (!screamDoc.exists) {
                return res.status(404).json({
                    error: `Scream not found!`
                })
            } else {
                await screamDoc.ref.update({
                    commentCount: screamDoc.data()!.commentCount + 1
                })
            }

            await db
                .collection(`comments`)
                .add(newComment);

            res.json(newComment);
        }  catch(err) {
            console.error(err);

            return res.status(500).json({
                error: `Something went wrong!`
            })
        }
    }
};