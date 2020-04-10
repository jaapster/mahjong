import { v4 } from 'uuid';
import { getTileSet } from './tiles';

let _games: Mahjong.Game[] = [];

export const createGame = (title?: string, creator?: string): Mahjong.Game => {
	const id = v4();
	const game = {
		id,
		title,
		creator,
		dealt: false,
		ts: getTileSet(),
		chairs: (new Array(4)).fill(0).map((_e, i) => (
			{
				id: `${ id }:${ v4() }`,
				player: null,
				position: ['a', 'b', 'c', 'd'][i],
				reveal: false
			}
		))
	};

	_games = [
		..._games,
		game
	];

	addPlayer(id, creator);
	deal(id);

	return game;
};

export const destroyGame = (id: string) => {
	_games = _games.filter((game) => game.id !== id);
};

export const listGames = (): Mahjong.Game[] => {
	return _games;
};

export const getGame = (id: string): Mahjong.Game => {
	return _games.find((game) => game.id === id);
}

export const setChairData = (gameId: string, chairPosition: string, chairData: Mahjong.Chair) => {
	_games = _games.map((game) => {
		if (game.id !== gameId) {
			return game;
		}

		return {
			...game,
			chairs: game.chairs.map(c => {
				if (c.position === chairPosition) {
					return chairData;
				}

				return c;
			})
		}
	});
}

/*
 * Seats a player (represented by name) in a game-chair
 * and return the chair id.
 **/
export const addPlayer = (id: string, player: string) => {
	let chair = { id: null };

	_games = _games.map((game) => {
		if (game.id !== id) {
			return game;
		}

		chair = game.chairs.find(c => c.player === null);

		return {
			...game,
			chairs: [
				...game.chairs.map((c, i) => {
					return c !== chair
						? c
						: {
							...c,
							player
						};
				})
			]
		}
	});

	return chair.id;
}

/*
 * Moves a tile to a tray at a specified index
 **/
export const moveTile = (
	gameId: string,
	tileId: number,
	toTray: string,
	toIndex: number
) => {
	const game = _games.find(game => game.id === gameId);
	const tile = game.ts.find(t => t.id === tileId);
	const fromTray = tile.tray;
	const fromIndex = tile.index;

	game.ts = game.ts.map(t => (
		t.tray === toTray && t.index >= toIndex
			? { ...t, index: t.index + 1 }
			: t
	));

	game.ts = game.ts.map(t => (
		t.tray === fromTray && t.index > fromIndex
			? { ...t, index: t.index - 1 }
			: t
	));

	game.ts = game.ts.map(t => (
		t.id === tileId
			? { ...t, tray: toTray, index: toIndex - (fromTray === toTray && fromIndex < toIndex ? 1 : 0) }
			: t
	));
}

export const deal = (id: string) => {
	_games = _games.map((game) => {
		if (game.id !== id || game.dealt) {
			return game;
		}

		return {
			...game,
			dealt: true,
			ts: game.ts.map((t, i) => {
				return {
					...t,
					tray: i < 13 ? 'a0' : i < 26 ? 'b0' : i < 39 ? 'c0' : i < 52 ? 'd0' : 't0',
					index: i - (i < 13 ? 0 : i < 26 ? 13 : i < 39 ? 26 : i < 52 ? 39 : 52)
				};
			})
		}
	});
};

// test stuff
const game1 = createGame('Woensdag mahjong', 'Anneke');

['José', 'Jaap', 'Peter'].forEach((name) => {
	addPlayer(game1.id, name);
});
