"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_sse_1 = __importDefault(require("express-sse"));
const game_1 = require("./game");
const app = express_1.default();
const port = 1001;
const globalStream = new express_sse_1.default({
    type: 'global',
    data: {}
});
const gameStreams = {};
app.use(body_parser_1.default.json());
// SSE
app.get('/streams/games/:id', (req, res) => {
    const gameId = req.params.id;
    if (!gameStreams[gameId]) {
        gameStreams[gameId] = new express_sse_1.default({
            type: 'game',
            data: game_1.getGame(gameId)
        });
    }
    gameStreams[gameId].init(req, res);
    gameStreams[gameId].send(game_1.getGame(gameId), 'game-state');
});
app.get('/streams/global', (req, res) => {
    globalStream.init(req, res);
});
// STATIC FILES
app.use('/', express_1.default.static('dist'));
// GAMES
app.get('/games', (req, res) => res.send(game_1.listGames()));
app.post('/games', (req, res) => {
    const { title, creator } = req.body;
    res.send(game_1.createGame(title, creator));
    globalStream.send({ games: game_1.listGames() }, 'games');
});
app.get('/games/:gameId', (req, res) => {
    const { gameId } = req.params;
    res.send(game_1.getGame(gameId));
});
app.delete('/games/:gameId', (req, res) => {
    var _a;
    const { gameId } = req.params;
    (_a = gameStreams[gameId]) === null || _a === void 0 ? void 0 : _a.send({ type: 'close', data: gameId }, 'game-close');
    res.send(game_1.destroyGame(gameId));
    globalStream.send({ games: game_1.listGames() }, 'games');
});
app.post('/games/:gameId/players', (req, res) => {
    const { gameId } = req.params;
    const { playerName } = req.body;
    res.send(game_1.addPlayer(gameId, playerName));
    gameStreams[gameId].send(game_1.getGame(gameId), 'game-state');
    globalStream.send({ games: game_1.listGames() }, 'games');
});
app.put('/games/:gameId/tiles/:tileId', (req, res) => {
    const { gameId, tileId } = req.params;
    const { to, index } = req.body;
    res.send(game_1.moveTile(gameId, parseInt(tileId), to, parseInt(index)));
    gameStreams[gameId].send(game_1.getGame(gameId), 'game-state');
});
app.put('/games/:gameId/chairs/:chairPosition', (req, res) => {
    const { gameId, chairPosition } = req.params;
    const { chairData } = req.body;
    res.send(game_1.setChairData(gameId, chairPosition, chairData));
    gameStreams[gameId].send(game_1.getGame(gameId), 'game-state');
});
app.listen(port, err => {
    if (err) {
        return console.error(err);
    }
    return console.log(`Mahjong server is listening on ${port}`);
});
