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
        },
        transit: false
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
            },
            transit: false
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
        const table = tables.find(table => table.id === id);
        const tile = table.game.tiles.find(tile => tile.id === tileId);
        const from = tile.tray;
        // check for illegal moves
        // move tile from wall to table
        if (tray === 't1' && tile.tray === 't0') {
            return {
                to: tray,
                from: tray,
                tile: tileId
            };
        }
        // move tile from table to open tray
        // if (tray === 'a1' || tray === 'b1' || tray === 'c1' || tray === 'd1') {
        // 	if (from === 't1') {
        // 		return {
        // 			to: tray,
        // 			from: tray,
        // 			tile: tileId
        // 		}
        // 	}
        // }
        // move tile from open tray to table
        if (from === 'a1' || from === 'b1' || from === 'c1' || from === 'd1') {
            if (tray === 't1') {
                return {
                    to: tray,
                    from: tray,
                    tile: tileId
                };
            }
        }
        tables = tables.map(table => {
            if (table.id !== id) {
                return table;
            }
            const { game } = table;
            const tile = game.tiles.find(t => t.id === tileId);
            const fromTray = tile.tray;
            const fromIndex = tile.index;
            if (tray === 't1') {
                game.tiles = game.tiles.map(t => (t.tray === tray
                    ? Object.assign(Object.assign({}, t), { tray: 't2' }) : t));
            }
            else {
                game.tiles = game.tiles.map(t => (t.tray === tray && t.index >= index
                    ? Object.assign(Object.assign({}, t), { index: t.index + 1 }) : t));
            }
            game.tiles = game.tiles.map(t => (t.tray === fromTray && t.index > fromIndex
                ? Object.assign(Object.assign({}, t), { index: t.index - 1 }) : t));
            game.tiles = game.tiles.map(t => (t.id === tileId
                ? Object.assign(Object.assign({}, t), { tray, index: index - (fromTray === tray && fromIndex < index ? 1 : 0) }) : t));
            return table;
        });
        return {
            from,
            to: tray,
            tile: tileId
        };
    }
};
