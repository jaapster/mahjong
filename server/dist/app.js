"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_sse_1 = __importDefault(require("express-sse"));
const path_1 = __importDefault(require("path"));
const game_1 = require("./game");
const app = express_1.default();
const port = 1001;
const sse = new express_sse_1.default({ type: 'connect' });
app.get('/stream', sse.init);
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname + '../../../client/index.html'));
});
app.get('/games', (req, res) => {
    res.send(game_1.listGames());
});
app.get('/games/:id', (req, res) => {
    res.send(game_1.getGame(req.params.id));
});
app.post('/games', (req, res) => {
    res.send(game_1.createGame());
});
app.delete('/games/:id', (req, res) => {
    res.send(game_1.destroyGame(req.params.id));
});
// todo: should be PUT
app.get('/games/:gameId/tiles/:fromId/:tileId', (req, res) => {
    const { gameId, tileId, fromId } = req.params;
    const { to } = req.query;
    res.send(game_1.moveTile(gameId, tileId, fromId, to));
    sse.send({ type: 'game', data: game_1.getGame(gameId) });
});
app.listen(port, err => {
    if (err) {
        return console.error(err);
    }
    return console.log(`Mahjong server is listening on ${port}`);
});
//# sourceMappingURL=app.js.map