declare namespace Mahjong {
	interface Tile {
		id: string;
		index: number;
		name: string;
		suit: string;
		tray: string;
		title: string;
		spaced: boolean;
		hidden: boolean;
		space: number;
	}

	interface Chair {
		id: string;
		player?: string;
		reveal: boolean;
		seated: boolean;
	}

	interface Table {
		id: string;
		chairs: Chair[];
		creator: string;
		transit: boolean;
		game: {
			tiles: Tile[];
		};
	}
}
