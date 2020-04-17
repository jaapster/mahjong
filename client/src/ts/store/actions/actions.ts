import axios from 'axios';


// SYNC //

export const ActionRestore = {
	create(userName: string, table: string) {
		return {
			type: 'actionRestore',
			data: {
				userName,
				table
			}
		};
	}
};

export const ActionLogin = {
	create(userName: string, password: string) {
		return {
			type: 'actionLogin',
			data: {
				userName,
				password
			}
		};
	}
};

export const ActionLogout = {
	create() {
		return {
			type: 'actionLogout',
			data: {}
		};
	}
};

export const ActionSetActiveTable = {
	create(id?: string) {
		return {
			type: 'actionSetActiveTable',
			data: {
				id
			}
		};
	}
};

export const ActionSetTables = {
	create(tables: Mahjong.Table[]) {
		return {
			type: 'actionSetTables',
			data: {
				tables
			}
		};
	}
};


// ASYNC //

const remoteDispatch = action => (
	axios.put('/dispatch', action)
);

export const ActionJoinTable = {
	create(tableId: string, chairId: string, player: string) {
		return (dispatch) => {
			const action = {
				type: 'actionJoinTable',
				data: {
					tableId,
					chairId,
					player
				}
			};

			dispatch(action);
			remoteDispatch(action);
		};
	}
};

export const ActionCreateTable = {
	create(creator: string) {
		return (dispatch) => {
			const action = {
				type: 'actionCreateTable',
				data: {
					creator
				}
			};

			dispatch(action);
			remoteDispatch(action);
		};
	}
};

export const ActionDeleteTable = {
	create(tableId: string) {
		return (dispatch) => {
			const action = {
				type: 'actionDeleteTable',
				data: {
					tableId
				}
			};

			dispatch(action);
			remoteDispatch(action);
		};
	}
};

export const ActionSetSeated = {
	create(tableId: string, chairId: string, seated: boolean) {
		return (dispatch) => {
			const action = {
				type: 'actionSetSeated',
				data: {
					tableId,
					chairId,
					seated
				}
			};

			dispatch(action);
			remoteDispatch(action);
		};
	}
};

export const ActionMoveTile = {
	create(tableId: string, tileId: string, toTray: string, toIndex: number) {
		return (dispatch) => {
			const action = {
				type: 'actionMoveTile',
				data: {
					tableId,
					tileId,
					toTray,
					toIndex
				}
			};

			dispatch(action);
			remoteDispatch(action);
		};
	}
};

export const ActionSpaceTile = {
	create(tableId: string, tileId: string, spaced: boolean) {
		return (dispatch) => {
			const action = {
				type: 'actionSpaceTile',
				data: {
					tableId,
					tileId,
					spaced
				}
			};

			dispatch(action);
			remoteDispatch(action);
		};
	}
};

export const ActionToggleTileHidden = {
	create(tableId: string, tileId: string) {
		return (dispatch) => {
			const action = {
				type: 'actionToggleTileHidden',
				data: {
					tableId,
					tileId
				}
			};

			dispatch(action);
			remoteDispatch(action);
		};
	}
};

export const ActionToggleReveal = {
	create(tableId: string, chairId: string) {
		return (dispatch) => {
			const action = {
				type: 'actionToggleReveal',
				data: {
					tableId,
					chairId
				}
			};

			dispatch(action);
			remoteDispatch(action);
		};
	}
};

export const ActionToggleTransit = {
	create(tableId: string) {
		return (dispatch) => {
			const action = {
				type: 'actionToggleTransit',
				data: {
					tableId
				}
			};

			dispatch(action);
			remoteDispatch(action);
		};
	}
};

export const ActionNewGame = {
	create(tableId: string) {
		return (dispatch) => {
			const action = {
				type: 'actionStartNewGame',
				data: {
					tableId
				}
			};

			dispatch(action);
			remoteDispatch(action);
		};
	}
};
