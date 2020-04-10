import express from 'express';
import bodyParser from 'body-parser';
import SSE from 'express-sse';
import {
	addPlayer,
	createGame,
	destroyGame,
	getGame,
	listGames,
	moveTile,
	setChairData,
} from './game';

const app = express();
const port = 1001;
const globalStream = new SSE({
	type: 'global',
	data: {}
});

const gameStreams = {};

app.use(bodyParser.json());

// SSE
app.get('/streams/games/:id', (req, res) => {
	const gameId = req.params.id;

	if (!gameStreams[gameId]) {
		gameStreams[gameId] = new SSE({
			type: 'game',
			data: getGame(gameId)
		});
	}

	gameStreams[gameId].init(req, res);
	gameStreams[gameId].send(getGame(gameId), 'game-state');
});

app.get('/streams/global', (req, res) => {
	globalStream.init(req, res);
});

// STATIC FILES
app.use('/', express.static('dist'));

// GAMES
app.get('/games', (req, res) => res.send(listGames()));


app.post('/games', (req, res) => {
	const { title, creator } = req.body;

	res.send(createGame(title, creator));

	globalStream.send({ games: listGames() }, 'games');
});

app.get('/games/:gameId', (req, res) => {
	const { gameId } = req.params;

	res.send(getGame(gameId));
});

app.delete('/games/:gameId', (req, res) => {
	const { gameId } = req.params;

	gameStreams[gameId]?.send(
		{ type: 'close', data: gameId },
		'game-close'
	);

	res.send(destroyGame(gameId));

	globalStream.send({ games: listGames() }, 'games');
});

app.post('/games/:gameId/players', (req, res) => {
	const { gameId } = req.params;
	const { playerName } = req.body;

	res.send(addPlayer(gameId, playerName));

	gameStreams[gameId].send(
		getGame(gameId),
		'game-state'
	);

	globalStream.send({ games: listGames() }, 'games');
});

app.put('/games/:gameId/tiles/:tileId', (req, res) => {
	const { gameId, tileId } = req.params;
	const { to, index } = req.body;

	res.send(moveTile(gameId, parseInt(tileId), to, parseInt(index)));

	gameStreams[gameId].send(
		getGame(gameId),
		'game-state'
	);
});

app.put('/games/:gameId/chairs/:chairPosition', (req, res) => {
	const { gameId, chairPosition } = req.params;
	const { chairData } = req.body;

	res.send(setChairData(gameId, chairPosition, chairData));

	gameStreams[gameId].send(
		getGame(gameId),
		'game-state'
	);
});

app.listen(port, err => {
	if (err) {
		return console.error(err);
	}

	return console.log(`Mahjong server is listening on ${ port }`);
});