"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const tiles_1 = require("./tiles");
let _games = [];
exports.createGame = (title, creator) => {
    const id = uuid_1.v4();
    const game = {
        id,
        title,
        creator,
        players: [],
        dealt: false,
        ts: tiles_1.getTileSet(),
        chairs: (new Array(4)).fill(0).map((_e, i) => ({
            id: `${id}:${uuid_1.v4()}`,
            player: null,
            position: ['a', 'b', 'c', 'd'][i]
        }))
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
exports.addPlayer = (id, player) => {
    let chair = { id: null };
    _games = _games.map((game) => {
        if (game.id !== id) {
            return game;
        }
        const chair = game.chairs.find(c => c.player === null);
        return Object.assign(Object.assign({}, game), { players: [], chairs: [
                ...game.chairs.map((c, i) => {
                    return c !== chair
                        ? c
                        : Object.assign(Object.assign({}, c), { player });
                })
            ] });
    });
    return chair.id;
};
exports.moveTile = (gameId, tileId, toId, index) => {
    const game = _games.find(game => game.id === gameId);
    game.ts = game.ts.map(t => t.id === tileId
        ? Object.assign(Object.assign({}, t), { tray: toId, index }) : t);
};
exports.deal = (id) => {
    _games = _games.map((game) => {
        if (game.id !== id || game.dealt) {
            return game;
        }
        return Object.assign(Object.assign({}, game), { dealt: true, ts: game.ts.map((t, i) => {
                return Object.assign(Object.assign({}, t), { tray: i < 14 ? 'a0' : i < 28 ? 'b0' : i < 42 ? 'c0' : i < 56 ? 'd0' : 't0', index: i - (i < 14 ? 0 : i < 28 ? 14 : i < 42 ? 28 : i < 56 ? 42 : 56) });
            }) });
    });
};
// test stuff
const game1 = exports.createGame('Woensdag mahjong', 'Anneke');
['Anneke', 'José', 'Joep', 'Peter'].forEach((name) => {
    exports.addPlayer(game1.id, name);
});
exports.deal(game1.id);
const game2 = exports.createGame('Mahjong Boefjes', 'Marjan');
['Marjan', 'Hugo'].forEach((name) => {
    exports.addPlayer(game2.id, name);
});
exports.deal(game2.id);
