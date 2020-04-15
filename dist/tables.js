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
                }, chairs: table.chairs.map(chair => (Object.assign(Object.assign({}, chair), { reveal: false }))) }) : table));
    },
    spaceTile(tableId, tileId, spaced) {
        let tray;
        tables = tables.map(table => {
            if (table.id !== tableId) {
                return table;
            }
            return Object.assign(Object.assign({}, table), { game: Object.assign(Object.assign({}, table.game), { tiles: table.game.tiles.map(tile => {
                        if (tile.id !== tileId) {
                            return tile;
                        }
                        tray = tile.tray;
                        return Object.assign(Object.assign({}, tile), { spaced });
                    }) }) });
        });
        return {
            tray,
            tile: tileId
        };
    },
    flipTile(tableId, tileId) {
        let tray;
        tables = tables.map(table => {
            if (table.id !== tableId) {
                return table;
            }
            return Object.assign(Object.assign({}, table), { game: Object.assign(Object.assign({}, table.game), { tiles: table.game.tiles.map(tile => {
                        if (tile.id !== tileId) {
                            return tile;
                        }
                        tray = tile.tray;
                        return Object.assign(Object.assign({}, tile), { hidden: !tile.hidden });
                    }) }) });
        });
        return {
            tray,
            tile: tileId
        };
    },
    updateTile(tableId, tileId, data) {
        tables = tables.map(table => {
            if (table.id !== tableId) {
                return table;
            }
            return Object.assign(Object.assign({}, table), { game: Object.assign(Object.assign({}, table.game), { tiles: table.game.tiles.map(tile => {
                        if (tile.id !== tileId) {
                            return tile;
                        }
                        return Object.assign(Object.assign({}, tile), data);
                    }) }) });
        });
    },
    moveTile(tableId, tileId, { tray, index }) {
        const openTrays = ['a1', 'b1', 'c1', 'd1'];
        let from = tray;
        tables = tables.map(table => {
            if (table.id !== tableId) {
                return table;
            }
            return Object.assign(Object.assign({}, table), { game: Object.assign(Object.assign({}, table.game), { tiles: table.game.tiles.map(tile => {
                        if (tile.id !== tileId) {
                            return tile;
                        }
                        // check for illegal moves
                        // move tile from wall to table
                        if (tile.tray === 't0' && tray === 't1') {
                            return tile;
                        }
                        // move tile from wall to open tray
                        if (openTrays.includes(tray) && tile.tray === 't0') {
                            return tile;
                        }
                        // move tile from open tray to table
                        if (openTrays.includes(from) && tray === 't1') {
                            return tile;
                        }
                        from = tile.tray;
                        return Object.assign(Object.assign({}, tile), { tray,
                            index });
                    }) }) });
        });
        return {
            to: tray,
            from,
            tile: tileId
        };
    }
};
