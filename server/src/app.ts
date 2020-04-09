import express from 'express';
import SSE from 'express-sse';
import { listGames, getGame, createGame, destroyGame, moveTile, addPlayer } from './game';

const app = express();
const port = 1001;
const streams = {};

app.get('/stream/:id', (req, res) => {
	const gameId = req.params.id;

	if (!streams[gameId]) {
		streams[gameId] = new SSE({
			type: 'game',
			data: getGame(gameId)
		});
	}

	streams[gameId].init(req, res);
	streams[gameId].send(getGame(gameId), 'game-state');
});

app.use('/', express.static('dist'));

app.get('/games', (req, res) => res.send(listGames()));

app.get('/games/:gameId', (req, res) => {
	const { gameId } = req.params;

	res.send(getGame(gameId));
});

app.post('/games', (req, res) => res.send(createGame()));

app.delete('/games/:gameId', (req, res) => {
	const { gameId } = req.params;

	destroyGame(gameId);

	streams[gameId].send(
		{ type: 'close', data: gameId },
		'game-close'
	);

	res.send();
});

// todo: should be a post
app.get('/games/:gameId/players/:playerName', (req, res) => {
	const { gameId, playerName } = req.params;

	res.send(addPlayer(gameId, playerName));

	streams[gameId].send(
		getGame(gameId),
		'game-state'
	);
});

app.put('/games/:gameId/tiles/:tileId', (req, res) => {
	const { gameId, tileId } = req.params;
	const { to, index } = req.query;

	moveTile(gameId, parseInt(tileId), to, index);

	streams[gameId].send(
		getGame(gameId),
		'game-state'
	);

	res.send();
});

app.listen(port, err => {
	if (err) {
		return console.error(err);
	}

	return console.log(`Mahjong server is listening on ${ port }`);
});