"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const tiles_1 = require("./tiles");
let _games = [];
exports.createGame = () => {
    const game = {
        id: uuid_1.v4(),
        players: [],
        dealt: false,
        tiles: {
            a0: [],
            a1: [],
            b0: [],
            b1: [],
            c0: [],
            c1: [],
            d0: [],
            d1: [],
            t0: tiles_1.getTileSet(),
            t1: []
        }
    };
    _games = [
        ..._games,
        game
    ];
    return game;
};
exports.destroyGame = (id) => {
    _games = _games.filter((game) => game.id !== id);
};
exports.listGames = () => {
    return _games;
};
exports.getGame = (id) => {
    return _games.find((game) => game.id === id);
};
exports.addPlayer = (id, name) => {
    _games = _games.map((game) => {
        if (game.id !== id) {
            return game;
        }
        return Object.assign(Object.assign({}, game), { players: [
                ...game.players,
                {
                    id: ['a', 'b', 'c', 'd'][game.players.length],
                    name
                }
            ] });
    });
};
exports.moveTile = (gameId, tileId, from, to) => {
    console.log(gameId, tileId, from, to);
    const game = _games.find(game => game.id === gameId);
    const tile = game.tiles[from].find(tile => tile.id == tileId);
    game.tiles[from] = game.tiles[from].filter(tile => tile.id != tileId);
    game.tiles[to] = game.tiles[to].concat(tile);
};
exports.deal = (id) => {
    _games = _games.map((game) => {
        if (game.id !== id || game.dealt) {
            return game;
        }
        return Object.assign(Object.assign({}, game), { dealt: true, tiles: Object.assign(Object.assign({}, game.tiles), { a0: game.tiles.t0.slice(0, 14), b0: game.tiles.t0.slice(14, 28), c0: game.tiles.t0.slice(28, 42), d0: game.tiles.t0.slice(42, 56), t0: game.tiles.t0.slice(56) }) });
    });
};
// test stuff
const game = exports.createGame();
['Leonard', 'Sheldon', 'Howard', 'Raj'].forEach((name) => {
    exports.addPlayer(game.id, name);
});
exports.deal(game.id);
//# sourceMappingURL=game.js.map