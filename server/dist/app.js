"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_sse_1 = __importDefault(require("express-sse"));
const game_1 = require("./game");
const app = express_1.default();
const port = 1001;
const streams = {};
app.get('/stream/:id', (req, res) => {
    const gameId = req.params.id;
    if (!streams[gameId]) {
        streams[gameId] = new express_sse_1.default({
            type: 'game',
            data: game_1.getGame(gameId)
        });
    }
    streams[gameId].init(req, res);
    streams[gameId].send(game_1.getGame(gameId), 'game-state');
});
app.use('/', express_1.default.static('dist'));
app.get('/games', (req, res) => res.send(game_1.listGames()));
app.get('/games/:gameId', (req, res) => {
    const { gameId } = req.params;
    res.send(game_1.getGame(gameId));
});
app.post('/games', (req, res) => res.send(game_1.createGame()));
app.delete('/games/:gameId', (req, res) => {
    const { gameId } = req.params;
    game_1.destroyGame(gameId);
    streams[gameId].send({ type: 'close', data: gameId }, 'game-close');
    res.send();
});
app.put('/games/:gameId/tiles/:fromId/:tileId', (req, res) => {
    const { gameId, tileId, fromId } = req.params;
    const { to, index } = req.query;
    game_1.moveTile(gameId, tileId, fromId, to, index);
    streams[gameId].send(game_1.getGame(gameId), 'game-state');
    res.send();
});
app.listen(port, err => {
    if (err) {
        return console.error(err);
    }
    return console.log(`Mahjong server is listening on ${port}`);
});
