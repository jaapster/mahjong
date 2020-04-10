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
        dealt: false,
        ts: tiles_1.getTileSet(),
        chairs: (new Array(4)).fill(0).map((_e, i) => ({
            id: `${id}:${uuid_1.v4()}`,
            player: null,
            position: ['a', 'b', 'c', 'd'][i],
            reveal: false
        }))
    };
    _games = [
        ..._games,
        game
    ];
    exports.addPlayer(id, creator);
    exports.deal(id);
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
exports.setChairData = (gameId, chairPosition, chairData) => {
    _games = _games.map((game) => {
        if (game.id !== gameId) {
            return game;
        }
        return Object.assign(Object.assign({}, game), { chairs: game.chairs.map(c => {
                if (c.position === chairPosition) {
                    return chairData;
                }
                return c;
            }) });
    });
};
/*
 * Seats a player (represented by name) in a game-chair
 * and return the chair id.
 **/
exports.addPlayer = (id, player) => {
    let chair = { id: null };
    _games = _games.map((game) => {
        if (game.id !== id) {
            return game;
        }
        chair = game.chairs.find(c => c.player === null);
        return Object.assign(Object.assign({}, game), { chairs: [
                ...game.chairs.map((c, i) => {
                    return c !== chair
                        ? c
                        : Object.assign(Object.assign({}, c), { player });
                })
            ] });
    });
    return chair.id;
};
/*
 * Moves a tile to a tray at a specified index
 **/
exports.moveTile = (gameId, tileId, toTray, toIndex) => {
    const game = _games.find(game => game.id === gameId);
    const tile = game.ts.find(t => t.id === tileId);
    const fromTray = tile.tray;
    const fromIndex = tile.index;
    game.ts = game.ts.map(t => (t.tray === toTray && t.index >= toIndex
        ? Object.assign(Object.assign({}, t), { index: t.index + 1 }) : t));
    game.ts = game.ts.map(t => (t.tray === fromTray && t.index > fromIndex
        ? Object.assign(Object.assign({}, t), { index: t.index - 1 }) : t));
    game.ts = game.ts.map(t => (t.id === tileId
        ? Object.assign(Object.assign({}, t), { tray: toTray, index: toIndex - (fromTray === toTray && fromIndex < toIndex ? 1 : 0) }) : t));
};
exports.deal = (id) => {
    _games = _games.map((game) => {
        if (game.id !== id || game.dealt) {
            return game;
        }
        return Object.assign(Object.assign({}, game), { dealt: true, ts: game.ts.map((t, i) => {
                return Object.assign(Object.assign({}, t), { tray: i < 13 ? 'a0' : i < 26 ? 'b0' : i < 39 ? 'c0' : i < 52 ? 'd0' : 't0', index: i - (i < 13 ? 0 : i < 26 ? 13 : i < 39 ? 26 : i < 52 ? 39 : 52) });
            }) });
    });
};
// test stuff
const game1 = exports.createGame('Woensdag mahjong', 'Anneke');
['José', 'Jaap', 'Peter'].forEach((name) => {
    exports.addPlayer(game1.id, name);
});
