import * as functions from 'firebase-functions';
import * as express from 'express';

import { useRoutes } from './middleware/useRoutes';

const app = express();

useRoutes(app);

exports.api = functions.https.onRequest(app);