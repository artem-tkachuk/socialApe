import * as functions from 'firebase-functions';
import * as express from 'express';

import { useRoutes } from './middleware/useRoutes';
import { createNotificationOnLike } from "./database/triggers/createNotificationOnLike";
import { createNotificationOnComment } from "./database/triggers/createNotificationOnComment";
import { deleteNotificationOnUnLike } from "./database/triggers/deleteNotificationOnUnLike";
import {onUserImageChange} from "./database/triggers/onUserImageChange";
import {onScreamDeleted} from "./database/triggers/onScreamDeleted";

const app = express();

useRoutes(app);

exports.api = functions
    .https
    .onRequest(app);

//Database triggers

exports.createNotificationOnLike = functions
    .firestore
    .document(`likes/{id}`)
    .onCreate(createNotificationOnLike);

exports.deleteNotificationOnUnLike = functions
    .firestore
    .document(`likes/{id}`)
    .onDelete(deleteNotificationOnUnLike);

exports.createNotificationOnComment = functions
    .firestore
    .document(`comments/{id}`)
    .onCreate(createNotificationOnComment);

exports.onUserImageChange = functions
    .firestore
    .document(`users/{userId}`)
    .onUpdate(onUserImageChange);

exports.onScreamDeleted = functions
    .firestore
    .document(`screams/{id}`)
    .onDelete(onScreamDeleted);