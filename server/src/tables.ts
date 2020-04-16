import { v4 } from 'uuid';
import { getTileSet } from './tiles';
import { dealTiles } from './utils/util-deal-tiles';

const chair = (id: string, player?: string) => (
	{ id, reveal: false, player, seated: false }
);

let tables: Mahjong.Table[] = [
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
			tiles: dealTiles(getTileSet())
		},
		transit: false
	}
];

const trayTiles = (tableId: string, trayId: string) => (
	tables
		.find(table => table.id === tableId)
		.game
		.tiles
		.filter(t => t.tray === trayId)
);

export const Tables = {
	all() {
		return tables;
	},

	create(creator: string) {
		const table = {
			id: v4(),
			creator,
			chairs: [
				chair('a', creator),
				chair('b'),
				chair('c'),
				chair('d')
			],
			game: {
				tiles: dealTiles(getTileSet())
			},
			transit: false
		};

		tables = tables.concat([table]);

		return table;
	},

	read(id: string) {
		return tables.find(table => table.id === id);
	},

	update(id: string, data: Mahjong.Table) {
		tables = tables.map(table => (
			table.id === id
				? data
				: table
		));

		return tables;
	},

	delete(id: string) {
		tables = tables.filter(table => table.id !== id);

		return tables;
	},

	updateChair(id: string, chairId: string, data: Mahjong.Chair) {
		tables = tables.map(table => (
			table.id === id
				? {
					...table,
					chairs: table.chairs.map(chair => (
						chair.id === chairId
							? data
							: chair
					))
				}
				: table
		));

		return tables;
	},

	newGame(id: string) {
		tables = tables.map(table => (
			table.id === id
				? {
					...table,
					game: {
						tiles: dealTiles(getTileSet())
					},
					chairs: table.chairs.map(chair => ({
						...chair,
						reveal: false
					}))
				}
				: table
		));
	},

	spaceTile(tableId: string, tileId: string, spaced: boolean) {
		let tray;

		tables = tables.map(table => {
			if (table.id !== tableId) {
				return table;
			}

			return {
				...table,
				game: {
					...table.game,
					tiles: table.game.tiles.map(tile => {
						if (tile.id !== tileId) {
							return tile;
						}

						tray = tile.tray;

						return {
							...tile,
							spaced
						};
					})
				}
			};
		});

		return {
			tray,
			tile: tileId
		};
	},

	flipTile(tableId: string, tileId: string) {
		let tray;

		tables = tables.map(table => {
			if (table.id !== tableId) {
				return table;
			}

			return {
				...table,
				game: {
					...table.game,
					tiles: table.game.tiles.map(tile => {
						if (tile.id !== tileId) {
							return tile;
						}

						tray = tile.tray;

						return {
							...tile,
							hidden: !tile.hidden
						};
					})
				}
			};
		});

		return {
			tray,
			tile: tileId
		};
	},

	updateTile(tableId: string, tileId, data: any) {
		tables = tables.map(table => {
			if (table.id !== tableId) {
				return table;
			}

			return {
				...table,
				game: {
					...table.game,
					tiles: table.game.tiles.map(tile => {
						if (tile.id !== tileId) {
							return tile;
						}

						return {
							...tile,
							...data
						};
					})
				}
			};
		});
	},

	moveTile(tableId: string, tileId: string, { tray, index }: { tray: string; index: number }) {
		const openTrays = ['a1', 'b1', 'c1', 'd1'];

		let from = tray;

		// const trayTiles = () => (
		// 	tables
		// 		.find(table => table.id === tableId)
		// 		.game
		// 		.tiles
		// 		.filter(t => t.tray === tray)
		// );

		tables = tables.map(table => {
			if (table.id !== tableId) {
				return table;
			}

			return {
				...table,
				game: {
					...table.game,
					tiles: table.game.tiles.map(tile => {
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

						return {
							...tile,
							tray,
							index,
							spaced: false
						};
					})
				}
			};
		});

		// renumber indices
		const tz = trayTiles(tableId, tray);

		tz
			.sort((a, b) => a.index > b.index ? 1 : -1)
			.forEach((t1, i) => { tz.find(t2 => t2.id === t1.id).index = i; });

		// is tile is put on table,
		// move tile that was there to inaccessible part of table
		if (tray === 't1' && from !== 't1') {
			const g = tz[tz.length - 2];

			if (g) {
				const gs = tables
					.find(table => table.id === tableId)
					.game
					.tiles
					.filter(t => t.tray === 't2');

				const h = gs[gs.length - 1];

				const i = h
					? h.index + 1
					: 0;

				return Tables.moveTile(tableId, g.id, { tray: 't2', index: i });
			}
		}

		return {
			to: tray,
			from,
			tile: tileId
		};
	}
};
