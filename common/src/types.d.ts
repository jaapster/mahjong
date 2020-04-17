declare namespace Mahjong {
	interface Coin {
		value: number;
	}

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
		coins: Coin[];
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

	interface Store {
		tables: Table[];
	}
}
