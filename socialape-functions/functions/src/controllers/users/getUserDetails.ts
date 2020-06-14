import { Request, Response } from "express";
import {UserDetails} from "../../interfaces/userDetails";
import db from "../../database/firestore";

//Get any user's details (including ourselves)

export const getUserDetails = (req: Request, res: Response) => {
    let userDetails: UserDetails = {};

    db
        .collection(`users`)
        .doc(req.params.handle)
        .get()
        // @ts-ignore
        .then(userDoc => {
            if (userDoc.exists) {
                // @ts-ignore
                userDetails.credentials = userDoc.data();

                return db
                    .collection(`screams`)
                    .where('userHandle', `==`, req.params.handle)
                    .orderBy('createdAt', 'desc')
                    .get();
            } else {
                return res.status(404).json({
                    error: `This user does not exist!`
                });
            }
        })
        .then(screams => {
            userDetails.screams = [];

            // @ts-ignore
            screams!.forEach(scream => {
               userDetails.screams?.push({
                   body: scream.data().body,
                   screamId: scream.id,
                   userHandle: scream.data().userHandle,
                   userImage: scream.data().userImage,
                   likeCount: scream.data().likeCount,
                   commentCount: scream.data().commentCount,
                   createdAt: scream.data().createdAt
               });
            });

            return res.json(userDetails);
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({
                error: err.code
            });
        })
};