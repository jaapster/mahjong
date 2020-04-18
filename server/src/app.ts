import express from 'express';
import https from 'https';
import fs from 'fs';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import { connectStore } from './store/store';
import { connectAuth } from './auth/authentication';

const app = express();
const port = 2001;

app.use(bodyParser.json());
app.use(cookieParser());
app.use('/', express.static('../client/build'));

connectAuth(app);
connectStore(app);

https.createServer({
	key: fs.readFileSync('localhost+2-key.pem'),
	cert: fs.readFileSync('localhost+2.pem')
}, app).listen(port, function () {
	console.log('Mahjong server on https://localhost:2001');
});
