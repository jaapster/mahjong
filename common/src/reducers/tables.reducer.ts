import { v4 } from 'uuid';
import { getTileSet } from '../utils/util-get-tiles';
import { dealTiles } from '../utils/util-deal-tiles';

const STATE: Mahjong.Table[] = [];

export const tables = (state: Mahjong.Table[] = STATE, action: { type: string; data: any}): Mahjong.Table[] => {
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
					{ id: 'a', reveal: false, player: creator, seated: false },
					{ id: 'b', reveal: false, seated: false },
					{ id: 'c', reveal: false, seated: false },
					{ id: 'd', reveal: false, seated: false }
				],
				game: {
					tiles: dealTiles(getTileSet())
				},
				transit: false
			}
		];
	}

	if (action.type === 'actionUpdateTable') {
		const {
			tableId,
			data
		} = action.data;

		return state.map(table => (
			table.id === tableId
				? {
					...table,
					...data
				}
				: table
		));
	}

	if (action.type === 'actionDeleteTable') {
		const {
			tableId
		} = action.data;

		return state.filter(table => table.id !== tableId);
	}

	if (action.type === 'actionUpdateChair') {
		const {
			tableId,
			chairId,
			data
		} = action.data;

		return state.map(table => (
			table.id === tableId
				? {
					...table,
					chairs: table.chairs.map(chair => (
						chair.id === chairId
							? {
								...chair,
								...data
							}
							: chair
					))
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

	if (action.type === 'actionUpdateTile') {
		const {
			tableId,
			tileId,
			data
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
									...data
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

		return state.map(table => (
			table.id !== tableId
				? table
				: {
					...table,
					game: {
						...table.game,
						tiles: table.game.tiles.map(tile => (
							tile.id !== tileId
								? tile.tray === 't1' && toTray === 't1'
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
												index: toIndex,
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
