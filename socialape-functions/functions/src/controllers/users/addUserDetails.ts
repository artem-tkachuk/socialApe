import { Request, Response } from 'express';
import {reduceUserDetails} from "../../util/validators";
import db from "../../database/firestore";


export const addUserDetails = (req: Request, res: Response) => {
    let userDetails = reduceUserDetails(req.body);

    // @ts-ignore
    db.doc(`/users/${req.user.handle}`).update(userDetails)
        .then(() => {
            return res.json({
                message: `Details added successfully!`
            })
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({
                error: err.code
            });
        })
};