declare namespace Mahjong {
	interface Tile {
		id: number;
		suit: string;
		name: number;
		tray: string;
		index: number;
	}

	interface Player {
		id: string;
		name: string;
	}

	interface Chair {
		id: string;
		position: string;
		player: string | null;
	}

	interface Game {
		title?: string;
		creator?: string;
		id: string;
		players: Player[];
		dealt: boolean;
		ts: Tile[];
		chairs: Chair[];
	}
}
