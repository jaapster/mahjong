import axios from 'axios';
import { getActionCreator } from '../../utils/util-get-action-creator';


// SYNC //

export const ActionLogin = getActionCreator<{
	userName: string;
	password: string;
}>('ActionLogin');

export const ActionLogout = getActionCreator<{}>('ActionLogout');

export const ActionSetActiveTable = getActionCreator<{
	id?: string;
}>('ActionSetActiveTable');

export const ActionSetTables = getActionCreator<{
	tables: Mahjong.Table[];
}>('ActionSetTables');


// ASYNC //

export const ActionJoinTable = {
	create(tableId: string, chairId: string, player: string) {
		return () => {
			axios.put(`/tables/${ tableId }/chairs/${ chairId }`, {
				data: {
					player
				}
			});
		};
	}
};

export const ActionCreateTable = {
	create(creator: string) {
		return () => {
			axios.post('/tables', { creator });
		};
	}
};

export const ActionDeleteTable = {
	create(id: string) {
		return () => {
			axios.delete(`/tables/${ id }`);
		};
	}
};

export const ActionSetSeated = {
	create(tableId: string, chairId: string, seated: boolean) {
		return () => {
			axios.put(`/tables/${ tableId }/chairs/${ chairId }`, {
				data: {
					seated
				}
			});
		};
	}
};

export const ActionMoveTile = {
	create(tableId: string, tileId: string, tray: string, index: number) {
		return () => {
			axios.put(`/tables/${ tableId }/game/tiles/${ tileId }`, {
				data: {
					tray,
					index
				}
			});
		};
	}
};

export const ActionSpaceTile = {
	create(tableId: string, tileId: string, spaced: boolean) {
		return () => {
			axios.put(`/tables/${ tableId }/game/tiles/${ tileId }`, {
				data: {
					spaced
				}
			});
		};
	}
};

export const ActionSetTileHidden = {
	create(tableId: string, tileId: string, hidden: boolean) {
		return () => {
			axios.put(`/tables/${ tableId }/game/tiles/${ tileId }`, {
				data: {
					hidden
				}
			});
		};
	}
};

export const ActionRevealTiles = {
	create(tableId: string, chairId: string, reveal: boolean) {
		return () => {
			axios.put(`/tables/${ tableId }/chairs/${ chairId }`, {
				data: {
					reveal
				}
			});
		};
	}
};

export const ActionSetTransit = {
	create(tableId: string, transit: boolean) {
		return () => {
			axios.put(`/tables/${ tableId }`, {
				data: {
					transit
				}
			});
		};
	}
};

export const ActionNewGame = {
	create(tableId: string) {
		return () => {
			axios.post(`/tables/${ tableId }/game`);
		};
	}
};
