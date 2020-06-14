import * as functions from 'firebase-functions';
import * as express from 'express';

import { useRoutes } from "./middleware/useRoutes";
import * as triggers from './database/triggers/triggers';

const app = express();

useRoutes(app);

console.log(triggers, typeof triggers);

// exports = { //TODO fix
//     ...triggers,
    exports.api = functions
        .https
        .onRequest(app);    //TODO deploy
// };