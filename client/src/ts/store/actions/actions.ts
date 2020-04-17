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

export const ActionJoinTable = {
	create(tableId: string, chairId: string, player: string) {
		return (dispatch) => {
			const action = {
				type: 'actionUpdateChair',
				data: {
					tableId,
					chairId,
					data: {
						player
					}
				}
			};

			axios.put('/dispatch', action);
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

			axios.put('/dispatch', action);
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

			axios.put('/dispatch', action);
		};
	}
};

export const ActionSetSeated = {
	create(tableId: string, chairId: string, seated: boolean) {
		return (dispatch) => {
			const action = {
				type: 'actionUpdateChair',
				data: {
					tableId,
					chairId,
					data: {
						seated
					}
				}
			};

			axios.put('/dispatch', action);
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

			axios.put('/dispatch', action);
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

			axios.put('/dispatch', action);
		};
	}
};

export const ActionSetTileHidden = {
	create(tableId: string, tileId: string, hidden: boolean) {
		return (dispatch) => {
			const action = {
				type: 'actionUpdateTile',
				data: {
					tableId,
					tileId,
					data: {
						hidden
					}
				}
			};

			axios.put('/dispatch', action);
		};
	}
};

export const ActionRevealTiles = {
	create(tableId: string, chairId: string, reveal: boolean) {
		return (dispatch) => {
			const action = {
				type: 'actionUpdateChair',
				data: {
					tableId,
					chairId,
					data: {
						reveal
					}
				}
			};

			axios.put('/dispatch', action);
		};
	}
};

export const ActionSetTransit = {
	create(tableId: string, transit: boolean) {
		return (dispatch) => {
			const action = {
				type: 'actionUpdateTable',
				data: {
					tableId,
					data: {
						transit
					}
				}
			};

			axios.put('/dispatch', action);
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

			axios.put('/dispatch', action);
		};
	}
};
