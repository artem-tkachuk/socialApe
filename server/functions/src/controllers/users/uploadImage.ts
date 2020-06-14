import { Request, Response } from "express";

import * as BusBoy from 'busboy';
import * as path from 'path';
import * as os from 'os';
import * as fs from 'fs';
import storage from "../../database/storage";

import {firebaseConfig} from "../../config/firebase";
import db from "../../database/firestore";


//TODO fix

// @ts-ignore
export const uploadImage = async (req: Request, res: Response) => {
    try {
        const busBoy = new BusBoy({
            headers: req.headers
        });

        let imageFileName: string;
        let imageToBeUploaded: { [key: string]: string } = {};

        // @ts-ignore
        busBoy.on('file', (fieldName, file, fileName, encoding, mimeType) => {
            if (mimeType !== `image/jpeg` && mimeType !== `image/png`) {
                return res.status(400).json({
                    error: `Wrong file type submitted!`
                });
            }

            // example: my.image.png
            const imageExtension = fileName.split(`.`)[fileName.split(`.`).length - 1];
            // example: 56473829495738239.png
            imageFileName = `${Math.round(Math.random() * 10000000000)}.${imageExtension}`;

            const filePath = path.join(os.tmpdir(), imageFileName);

            imageToBeUploaded = {filePath, mimeType};

            file.pipe(fs.createWriteStream(filePath));  //creates a file
        });

        busBoy.on('finish', async () => {
            await storage
                .bucket(firebaseConfig.storageBucket)
                .upload(imageToBeUploaded.filePath, {
                    resumable: false,
                    metadata: {
                        metadata: {
                            contentType: imageToBeUploaded.mimeType
                        }
                    }
                });

            const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/${imageFileName}?alt=media`;
            // @ts-ignore
            await db.doc(`users/${req.user.handle}`).update({imageUrl});

            // @ts-ignore
            busBoy.end(req.rawBody);

            return res.json({
                message: `Image uploaded successfully!`
            });
        })
    } catch(err) {
        console.error(err);
        return res.status(500).json({
            error: err.code
        });
    }
};