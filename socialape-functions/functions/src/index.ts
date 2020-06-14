import * as functions from 'firebase-functions';
import * as express from 'express';

import { useRoutes } from './middleware/useRoutes';
import { createNotificationOnLike } from "./database/triggers/createNotificationOnLike";
import { createNotificationOnComment } from "./database/triggers/createNotificationOnComment";
import { createNotificationOnUnLike } from "./database/triggers/deleteNotificationOnUnLike";

const app = express();

useRoutes(app);

exports.api = functions
    .https
    .onRequest(app);

exports.createNotificationOnLike = functions
    .firestore
    .document(`likes/{id}`)
    .onCreate(createNotificationOnLike);

exports.deleteNotificationOnUnLike = functions
    .firestore
    .document(`likes/{id}`)
    .onDelete(createNotificationOnUnLike);

exports.createNotificationOnComment = functions
    .firestore
    .document(`comments/{id}`)
    .onCreate(createNotificationOnComment);