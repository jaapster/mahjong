"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const tiles_1 = require("./tiles");
const util_deal_tiles_1 = require("./utils/util-deal-tiles");
const chair = (id, player) => ({ id, reveal: false, player, seated: false });
let tables = [
    {
        id: '42',
        creator: 'Jaap',
        chairs: [
            chair('a', 'Jaap'),
            chair('b', 'Biezoe'),
            chair('c', 'Mariska'),
            chair('d', 'Goof')
        ],
        game: {
            tiles: util_deal_tiles_1.dealTiles(tiles_1.getTileSet())
        }
    }
];
exports.Tables = {
    all() {
        return tables;
    },
    create(creator) {
        const table = {
            id: uuid_1.v4(),
            creator,
            chairs: [
                chair('a', creator),
                chair('b'),
                chair('c'),
                chair('d')
            ],
            game: {
                tiles: util_deal_tiles_1.dealTiles(tiles_1.getTileSet())
            }
        };
        tables = tables.concat([table]);
        return table;
    },
    read(id) {
        return tables.find(table => table.id === id);
    },
    update(id, data) {
        tables = tables.map(table => (table.id === id
            ? data
            : table));
        return tables;
    },
    delete(id) {
        tables = tables.filter(table => table.id !== id);
        return tables;
    },
    updateChair(id, chairId, data) {
        tables = tables.map(table => (table.id === id
            ? Object.assign(Object.assign({}, table), { chairs: table.chairs.map(chair => (chair.id === chairId
                    ? data
                    : chair)) }) : table));
        return tables;
    },
    newGame(id) {
        tables = tables.map(table => (table.id === id
            ? Object.assign(Object.assign({}, table), { game: {
                    tiles: util_deal_tiles_1.dealTiles(tiles_1.getTileSet())
                } }) : table));
    },
    moveTile(id, tileId, { tray, index }) {
        tables = tables.map(table => {
            if (table.id !== id) {
                return table;
            }
            const { game } = table;
            const tile = game.tiles.find(t => t.id === tileId);
            const fromTray = tile.tray;
            const fromIndex = tile.index;
            game.tiles = game.tiles.map(t => (t.tray === tray && t.index >= index
                ? Object.assign(Object.assign({}, t), { index: t.index + 1 }) : t));
            game.tiles = game.tiles.map(t => (t.tray === fromTray && t.index > fromIndex
                ? Object.assign(Object.assign({}, t), { index: t.index - 1 }) : t));
            game.tiles = game.tiles.map(t => (t.id === tileId
                ? Object.assign(Object.assign({}, t), { tray, index: index - (fromTray === tray && fromIndex < index ? 1 : 0) }) : t));
            return table;
        });
    }
};