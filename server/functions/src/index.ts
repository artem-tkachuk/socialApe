import * as functions from 'firebase-functions';
import * as express from 'express';

import { useRoutes } from "./middleware/useRoutes";
import * as triggers from './database/triggers/triggers';

const app = express();

useRoutes(app);

module.exports = {
    ...triggers,
    api : functions.https.onRequest(app)
};


