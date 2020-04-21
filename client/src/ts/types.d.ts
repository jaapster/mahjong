declare namespace Mahjong {
	interface Coin {
		value: number;
	}

	interface Tile {
		hidden: boolean;
		id: string;
		index: number;
		name: string;
		space: number;
		spaced: boolean;
		suit: string;
		title: string;
		tray: string;
	}

	interface Chair {
		coins: Coin[];
		id: string;
		player?: string;
		reveal: boolean;
		seated: boolean;
	}

	interface Table {
		chairs: Chair[];
		creator: string;
		id: string;
		transit: boolean;
		game: {
			id: string;
			tiles: Tile[];
		};
	}

	interface User {
		name: string;
		id: string;
	}

	interface Auth {
		error?: string;
		user?: User;
		authenticate?: boolean;
	}

	interface Action {
		data: any;
		type: string;
	}

	interface Settings {
		size: number;
		activeTable?: string;
	}

	interface Store {
		auth: Auth;
		settings: Settings;
		tables: Mahjong.Table[];
	}
}
