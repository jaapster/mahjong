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
		}

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

	moveTile(tableId: string, tileId: string, { tray, index }: { tray: string; index: number }) {
		const table = tables.find(table => table.id === tableId);
		const tile = table.game.tiles.find(tile => tile.id === tileId);

		const openTrays = ['a1', 'b1', 'c1', 'd1'];
		const noMove = {
			to: tray,
			from: tray,
			tile: tileId
		};

		if (!tile) {
			console.log('tile not found with id', tileId);
			return noMove;
		}

		const from = tile.tray;

		// check for illegal moves

		// move tile from wall to table
		if (tray === 't1' && tile.tray === 't0') {
			return noMove;
		}

		// move tile from wall to open tray
		if (openTrays.includes(tray) && tile.tray === 't0') {
			return noMove;
		}

		// move tile from open tray to table
		if (openTrays.includes(from) && tray === 't1') {
			return noMove;
		}

		tables = tables.map(table => {
			if (table.id !== tableId) {
				return table;
			}

			const { game } = table;
			const tile = game.tiles.find(t => t.id === tileId);
			const fromTray = tile.tray;
			const fromIndex = tile.index;

			if (tray === 't1') {
				// tile in "active" table zone moves to inactive zone
				game.tiles = game.tiles.map(t => (
					t.tray === tray
						? { ...t, tray: 't2' }
						: t
				));
			} else {
				game.tiles = game.tiles.map(t => (
					t.tray === tray && t.index >= index
						? { ...t, index: t.index + 1 }
						: t
				));
			}

			game.tiles = game.tiles.map(t => (
				t.tray === fromTray && t.index > fromIndex
					? { ...t, index: t.index - 1 }
					: t
			));

			game.tiles = game.tiles.map(t => (
				t.id === tileId
					? { ...t, tray, index: index - (fromTray === tray && fromIndex < index ? 1 : 0) }
					: t
			));

			return table;
		});

		if (from !== tray) {
			console.log('Tile', tileId, 'moved from', from, 'to', tray, 'at index', index);
		}

		return {
			from,
			to: tray,
			tile: tileId
		};
	}
};
