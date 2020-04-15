import express from 'express';
import https from 'https';
import fs from 'fs';
import bodyParser from 'body-parser';
import SSE from 'express-sse';
import { Tables } from './tables';

const app = express();
const port = 2001;

app.use(bodyParser.json());

// Statics
app.use('/', express.static('../client/build'));

const clock = new SSE(['tick']);

setInterval(() => clock.send('tick'), 1000);

app.get('/streams/clock', (req, res) => {
	clock.init(req, res);
});

// Tables
const tableStreams = {};
const tablesStream = new SSE({
	type: 'tables',
	data: {}
});

app.get('/streams/tables', (req, res) => {
	tablesStream.init(req, res);
});

app.get('/streams/tables/:id', (req, res) => {
	const id = req.params.id;

	if (!tableStreams[id]) {
		tableStreams[id] = new SSE({
			type: 'table',
			data: Tables.read(id)
		});
	}

	tableStreams[id].init(req, res);
	tableStreams[id].send(Tables.read(id), 'update');
});

app.get('/tables', (req, res) => {
	res.send(Tables.all());
});

app.post('/tables', (req, res) => {
	res.send(Tables.create(req.body.creator));
	tablesStream.send(Tables.all(), 'update');
});

app.get('/tables/:id', (req, res) => {
	res.send(Tables.read(req.params.id));
});

app.put('/tables/:id', ({ params: { id }, body: { data } }, res) => {
	res.send(Tables.update(id, data));
	tablesStream.send(Tables.all(), 'update');
	tableStreams[id]?.send(Tables.read(id), 'update');
});

app.delete('/tables/:id', (req, res) => {
	res.send(Tables.delete(req.params.id));
	tablesStream.send(Tables.all(), 'update');
});

app.post('/tables/:id/game', ({ params: { id } }, res) => {
	res.send(Tables.newGame(id));
	tableStreams[id]?.send(Tables.read(id), 'update');
});

app.put('/tables/:id/chairs/:chair', ({ params: { id, chair }, body: { data } }, res) => {
	res.send(Tables.updateChair(id, chair, data));
	tablesStream.send(Tables.all(), 'update');
	tableStreams[id]?.send(Tables.read(id), 'update');
});

app.put('/tables/:id/game/tiles/:tileId', ({ params: { id, tileId }, body: { data } }, res) => {
	if (data.tray && data.index != null) {
		const event = Tables.moveTile(id, tileId, data);
		res.send(event);
		tableStreams[id].send(Tables.read(id), 'update');
		tableStreams[id].send(event, 'tile-move');
	} else {
		const event = Tables.updateTile(id, tileId, data);
		res.send(event);
		tableStreams[id].send(Tables.read(id), 'update');
	}
});

https.createServer({
	key: fs.readFileSync('localhost+2-key.pem'),
	cert: fs.readFileSync('localhost+2.pem')
}, app).listen(port, function () {
	console.log('Mahjong server on https://localhost:2001');
});