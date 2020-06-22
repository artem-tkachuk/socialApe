import * as functions from 'firebase-functions';
import * as express from 'express';
import * as cors from 'cors';

import { useRoutes } from "./middleware/useRoutes";
import * as triggers from './database/triggers/triggers';

const app = express();

app.use(cors());

useRoutes(app);

module.exports = {
    ...triggers,
    api : functions.https.onRequest(app)
};


