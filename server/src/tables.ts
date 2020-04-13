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
					}
				}
				: table
		));
	},

	moveTile(id: string, tileId: string, { tray, index }: { tray: string; index: number }) {
		let from;

		tables = tables.map(table => {
			if (table.id !== id) {
				return table;
			}

			const { game } = table;
			const tile = game.tiles.find(t => t.id === tileId);
			const fromTray = tile.tray;
			const fromIndex = tile.index;

			from = fromTray;

			if (tray === 't1') {
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

		return {
			from,
			to: tray,
			tile: tileId
		};
	}
};
