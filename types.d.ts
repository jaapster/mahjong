declare namespace Mahjong {
	interface Tile {
		id: number;
		suit?: string,
		name?: number
	}

	interface Player {
		id: string;
		name: string;
	}

	interface Game {
		id: string;
		players: Player[];
		dealt: boolean;
		tiles: {
			t0: Tile[];
			t1: Tile[];
			a0: Tile[];
			a1: Tile[];
			b0: Tile[];
			b1: Tile[];
			c0: Tile[];
			c1: Tile[];
			d0: Tile[];
			d1: Tile[];
		}
	}
}
