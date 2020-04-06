import express from 'express';
import SSE from 'express-sse';
import path from 'path';
import { listGames, getGame, createGame, destroyGame, moveTile } from './game';

const app = express();
const port = 1001;
const sse = new SSE({ type: 'connect' });

app.get('/stream', sse.init);

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname + '../../../client/index.html'));
});

app.get('/games', (req, res) => {
	res.send(listGames());
});

app.get('/games/:id', (req, res) => {
	res.send(getGame(req.params.id));
});

app.post('/games', (req, res) => {
	res.send(createGame());
});

app.delete('/games/:id', (req, res) => {
	res.send(destroyGame(req.params.id));
});

// todo: should be PUT
app.get('/games/:gameId/tiles/:fromId/:tileId', (req, res) => {
	const { gameId, tileId, fromId } = req.params;
	const { to } = req.query;

	res.send(moveTile(gameId, tileId, fromId, to));
	sse.send({ type: 'game', data: getGame(gameId) });
});

app.listen(port, err => {
	if (err) {
		return console.error(err);
	}

	return console.log(`Mahjong server is listening on ${ port }`);
});