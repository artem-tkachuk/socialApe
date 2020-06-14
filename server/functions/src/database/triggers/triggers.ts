import * as functions from "firebase-functions";

import {createNotificationOnLike} from "./controllers/createNotificationOnLike";
import {deleteNotificationOnUnLike} from "./controllers/deleteNotificationOnUnLike";
import {createNotificationOnComment} from "./controllers/createNotificationOnComment";
import {onUserImageChange} from "./controllers/onUserImageChange";
import {onScreamDeleted} from "./controllers/onScreamDeleted";

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