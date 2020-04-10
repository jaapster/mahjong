declare namespace Mahjong {
	interface Tile {
		id: number;
		index: number;
		name: number;
		suit: string;
		tray: string;
	}

	interface Chair {
		id: string;
		player: string | null;
		position: string;
		reveal: boolean;
	}

	interface Game {
		chairs: Chair[];
		creator?: string;
		dealt: boolean;
		id: string;
		title?: string;
		ts: Tile[];
	}
}
