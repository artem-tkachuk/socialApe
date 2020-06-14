import { Request, Response } from "express";
import {UserDetails} from "../../interfaces/userDetails";
import db from "../../database/firestore";

//Get any user's details (including ourselves)
export const getUserDetails = async (req: Request, res: Response) => {
    try {
        let userDetails: UserDetails = {};

        const userDoc = await db
            .collection(`users`)
            .doc(req.params.handle)
            .get();

        if (!userDoc.exists) {
            return res.status(404).json({
                error: `This user does not exist!`
            });
        } else {
            // @ts-ignore
            userDetails.credentials = userDoc.data();

            const screamsDocs = await db
                .collection(`screams`)
                .where('userHandle', `==`, req.params.handle)
                .orderBy('createdAt', 'desc')
                .get();

            userDetails.screams = [];

            // @ts-ignore
            screamsDocs!.forEach(screamDoc => {
                userDetails.screams?.push({
                    body: screamDoc.data().body,
                    screamId: screamDoc.id,
                    userHandle: screamDoc.data().userHandle,
                    userImage: screamDoc.data().userImage,
                    likeCount: screamDoc.data().likeCount,
                    commentCount: screamDoc.data().commentCount,
                    createdAt: screamDoc.data().createdAt
                });
            });

            return res.json(userDetails);
        }
    } catch(err)  {
        console.error(err);

        return res.status(500).json({
            error: err.code
        });
    }
};