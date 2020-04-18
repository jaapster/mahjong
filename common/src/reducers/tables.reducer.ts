import { v4 } from 'uuid';
import { getTileSet } from '../utils/util-get-tiles';
import { dealTiles } from '../utils/util-deal-tiles';

const STATE: Mahjong.Table[] = [
	{
		id: '42',
		creator: 'Zaphod',
		chairs: [
			{ id: 'a', reveal: false, seated: true, coins: [], player: 'zaphod' },
			{ id: 'b', reveal: false, seated: true, coins: [], player: 'ford' },
			{ id: 'c', reveal: false, seated: true, coins: [], player: 'trillian' },
			{ id: 'd', reveal: false, seated: false, coins: [] }
		],
		game: {
			tiles: dealTiles(getTileSet())
		},
		transit: false
	}
];

const byId = id => item => item.id === id;

export const tables = (state: Mahjong.Table[] = STATE, action: any): Mahjong.Table[] => {
	if (action.type === 'actionSetTables') {
		const {
			tables
		} = action.data;

		return tables;
	}

	if (action.type === 'actionCreateTable') {
		const {
			creator
		} = action.data;

		return [
			...state,
			{
				id: v4(),
				creator,
				chairs: [
					{ id: 'a', reveal: false, seated: false, coins: [], player: creator },
					{ id: 'b', reveal: false, seated: false, coins: [] },
					{ id: 'c', reveal: false, seated: false, coins: [] },
					{ id: 'd', reveal: false, seated: false, coins: [] }
				],
				game: {
					tiles: dealTiles(getTileSet())
				},
				transit: false
			}
		];
	}

	if (action.type === 'actionDeleteTable') {
		const {
			tableId
		} = action.data;

		return state.filter(table => table.id !== tableId);
	}

	if (action.type === 'actionJoinTable') {
		const {
			tableId,
			chairId,
			player
		} = action.data;

		return state.map(table => (
			table.id === tableId
				? {
					...table,
					chairs: table.chairs.map(chair => (
						chair.id === chairId
							? {
								...chair,
								player
							}
							: chair
					))
				}
				: table
		));
	}

	if (action.type === 'actionSetSeated') {
		const {
			tableId,
			chairId,
			seated
		} = action.data;

		return state.map(table => (
			table.id === tableId
				? {
					...table,
					chairs: table.chairs.map(chair => (
						chair.id === chairId
							? {
								...chair,
								seated
							}
							: chair
					))
				}
				: table
		));
	}

	if (action.type === 'actionToggleReveal') {
		const {
			tableId,
			chairId
		} = action.data;

		return state.map(table => (
			table.id === tableId
				? {
					...table,
					chairs: table.chairs.map(chair => (
						chair.id === chairId
							? {
								...chair,
								reveal: !chair.reveal
							}
							: chair
					))
				}
				: table
		));
	}

	if (action.type === 'actionToggleTransit') {
		const {
			tableId
		} = action.data;

		return state.map(table => (
			table.id === tableId
				? {
					...table,
					transit: !table.transit
				}
				: table
		));
	}

	if (action.type === 'actionStartNewGame') {
		const {
			tableId
		} = action.data;

		return state.map(table => (
			table.id === tableId
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
	}

	if (action.type === 'actionToggleTileHidden') {
		const {
			tableId,
			tileId
		} = action.data;

		return state.map(table => (
			table.id !== tableId
				? table
				: {
					...table,
					game: {
						...table.game,
						tiles: table.game.tiles.map(tile => (
							tile.id !== tileId
								? tile
								: {
									...tile,
									hidden: !tile.hidden
								}
						))
					}
				}
		));
	}

	if (action.type === 'actionSpaceTile') {
		const {
			tableId,
			tileId,
			spaced
		} = action.data;

		return state.map(table => (
			table.id !== tableId
				? table
				: {
					...table,
					game: {
						...table.game,
						tiles: table.game.tiles.map(tile => (
							tile.id !== tileId
								? tile
								: {
									...tile,
									spaced
								}
						))
					}
				}
		));
	}

	if (action.type === 'actionFlipTile') {
		const {
			tableId,
			tileId
		} = action.data;

		return state.map(table => (
			table.id !== tableId
				? table
				: {
					...table,
					game: {
						...table.game,
						tiles: table.game.tiles.map(tile => (
							tile.id !== tileId
								? tile
								: {
									...tile,
									hidden: !tile.hidden
								}
						))
					}
				}
		));
	}

	if (action.type === 'actionMoveTile') {
		const {
			tableId,
			tileId,
			toTray,
			toIndex
		} = action.data;

		const target = state.find(byId(tableId))?.game.tiles.find(byId(tileId));
		const fromRack = target?.tray !== 't0' && target?.tray[1] === '0';

		return state.map(table => (
			table.id !== tableId
				? table
				: {
					...table,
					game: {
						...table.game,
						tiles: table.game.tiles.map(tile => (
							tile.id !== tileId
								? tile.tray === 't1' && toTray === 't1' && fromRack
									/*
										Tile moved to accessible part of table,
										move the tile that was there to inaccessible part
										of table
									*/
									? {
										...tile,
										tray: 't2'
									}
									: tile
								: tile.tray === 't0' && toTray === 't1'
									/*
										Tile moved from wall to table, this is
										not allowed
									*/
									? tile
									: toTray[1] === '1' && tile.tray === 't0'
										/*
											Tile moved from a open tray to wall,
											this is not allowed
										*/
										? tile
										: tile.tray[1] === '1' && toTray === 't1'
											/*
												Tile moved from a open tray to table,
												this is not allowed
											*/
											 ? tile
											 : {
												...tile,
												tray: toTray,
												index: toTray === 't0' && toIndex > 0
													? Infinity
													: toIndex,
												spaced: false
											}
						))
						.sort((a, b) => a.index > b.index ? 1 : -1)
						.reduce((m, tile) => {
							const index = (m.indices[tile.tray] ?? -1) + 1;

							return {
								indices: {
									...m.indices,
									[tile.tray]: index
								},
								tiles: [
									...m.tiles,
									index === tile.index
										? tile
										: {
											...tile,
											index
										}
								]
							};
						}, { indices: {}, tiles: []}).tiles
					}
				}
		));
	}

	return state;
};
