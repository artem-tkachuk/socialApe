import {Request, Response} from "express";
import db from "../../database/firestore";

// @ts-ignore
export const deleteScream = async (req: Request, res: Response) => {
    try {
        const screamDocumentRef = db
            .collection(`screams`)
            .doc(req.params.screamId);

        const screamDoc = await screamDocumentRef.get();

        if (!screamDoc.exists) {
            return res.status(404).json({
                error: `Scream not found!`
            })
            // @ts-ignore
        } else if (screamDoc.data()!.userHandle !== req.user.handle) {
            return res.status(403).json({
                error: `Unauthorized`
            });
        } else {
            await screamDocumentRef.delete();
        }

        return res.json({
            message: `Scream deleted successfully!`
        });
    } catch(err) {
        console.error(err);
        res.status(500).json({
            error: err.code
        });
    }
};