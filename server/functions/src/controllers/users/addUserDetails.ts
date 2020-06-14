import { Request, Response } from 'express';
import {reduceUserDetails} from "../../util/validators";
import db from "../../database/firestore";


export const addUserDetails = async (req: Request, res: Response) => {
    try {
        let userDetails = reduceUserDetails(req.body);

        await db
            .collection(`users`)
            // @ts-ignore
            .doc(req.user.handle)
            .update(userDetails);

        return res.json({
            message: `Details added successfully!`
        })
    } catch(err) {
        console.error(err);

        return res.status(500).json({
            error: err.code
        });
    }
};