import { v4 } from 'uuid';
import { getTileSet } from './tiles';

let _games: Mahjong.Game[] = [];

export const createGame = (): Mahjong.Game => {
	const game = {
		id: v4(),
		players: [],
		dealt: false,
		tiles: {
			a0: [],
			a1: [],
			b0: [],
			b1: [],
			c0: [],
			c1: [],
			d0: [],
			d1: [],
			t0: getTileSet(),
			t1: []
		}
	};

	_games = [
		..._games,
		game
	];

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

export const addPlayer = (id: string, name: string) => {
	_games = _games.map((game) => {
		if (game.id !== id) {
			return game;
		}

		return {
			...game,
			players: [
				...game.players,
				{
					id: ['a', 'b', 'c', 'd'][game.players.length],
					name
				}
			]
		}
	});
}

export const moveTile = (
	gameId: string,
	tileId: string,
	fromId: string,
	toId: string,
	index?: number
) => {
	const game = _games.find(game => game.id === gameId);
	const tile = game.tiles[fromId].find(tile => tile.id == tileId);

	game.tiles[fromId] = game.tiles[fromId].filter(tile => tile.id != tileId);
	game.tiles[toId] = index == null
		? game.tiles[toId].concat(tile)
		: game.tiles[toId].splice(index, 0, tile);
}

export const deal = (id: string) => {
	_games = _games.map((game) => {
		if (game.id !== id || game.dealt) {
			return game;
		}

		return {
			...game,
			dealt: true,
			tiles: {
				...game.tiles,
				a0: game.tiles.t0.slice(0, 14),
				b0: game.tiles.t0.slice(14, 28),
				c0: game.tiles.t0.slice(28, 42),
				d0: game.tiles.t0.slice(42, 56),
				t0: game.tiles.t0.slice(56)
			}
		}
	});
};

// test stuff
const game1 = createGame();

['Leonard', 'Sheldon', 'Howard', 'Raj'].forEach((name) => {
	addPlayer(game1.id, name);
});

deal(game1.id);

const game2 = createGame();

['Fred', 'Barney', 'Bettie'].forEach((name) => {
	addPlayer(game2.id, name);
});

deal(game2.id);
