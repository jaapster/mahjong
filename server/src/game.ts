import { v4 } from 'uuid';
import { getTileSet } from './tiles';

let _games: Mahjong.Game[] = [];

export const createGame = (title?: string, creator?: string): Mahjong.Game => {
	const id = v4();
	const game = {
		id,
		title,
		creator,
		players: [],
		dealt: false,
		ts: getTileSet(),
		chairs: (new Array(4)).fill(0).map((_e, i) => (
			{
				id: `${ id }:${ v4() }`,
				player: null,
				position: ['a', 'b', 'c', 'd'][i]
			}
		))
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

export const addPlayer = (id: string, player: string) => {
	let chair = { id: null };

	_games = _games.map((game) => {
		if (game.id !== id) {
			return game;
		}

		const chair = game.chairs.find(c => c.player === null);

		return {
			...game,
			players: [],
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

export const moveTile = (
	gameId: string,
	tileId: number,
	toId: string,
	index: number
) => {
	const game = _games.find(game => game.id === gameId);

	game.ts = game.ts.map(t => t.id === tileId
		? { ...t, tray: toId, index }
		: t
	);
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
					tray: i < 14 ? 'a0' : i < 28 ? 'b0' : i < 42 ? 'c0' : i < 56 ? 'd0' : 't0',
					index: i - (i < 14 ? 0 : i < 28 ? 14 : i < 42 ? 28 : i < 56 ? 42 : 56)
				};
			})
		}
	});
};

// test stuff
const game1 = createGame('Woensdag mahjong', 'Anneke');

['Anneke', 'José', 'Joep', 'Peter'].forEach((name) => {
	addPlayer(game1.id, name);
});

deal(game1.id);

const game2 = createGame('Mahjong Boefjes', 'Marjan');

['Marjan', 'Hugo'].forEach((name) => {
	addPlayer(game2.id, name);
});

deal(game2.id);
