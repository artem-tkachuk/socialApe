require('dotenv').config(); //load environmental variables

import * as functions from 'firebase-functions';
import * as express from 'express';

import routes from './routes/routes';

const app = express();

app.use(routes);

exports.api = functions.https.onRequest(app);

// good practice: https://baseurl.com/api/...
