import axios from 'axios';

// SYNC //

export const ActionRestore = {
	create(user: Mahjong.User, table: string) {
		return {
			type: 'actionRestore',
			data: {
				user,
				table
			}
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

export const ActionSetUser = {
	create(user: Mahjong.User) {
		return {
			type: 'actionSetUser',
			data: {
				user
			}
		};
	}
};


// ASYNC //

const remoteDispatch = action => (
	axios.put('/dispatch', action)
);

export const ActionRegister = {
	create(userName: string, password: string) {
		return (dispatch) => {
			axios
				.post('/auth/register', {
					userName,
					password
				})
				.then(res => {
					if (res.data.success === true) {
						dispatch({
							type: 'actionSetAuthError',
							data: {
								error: undefined
							}
						});
						dispatch({
							type: 'actionSetUser',
							data: {
								user: res.data.data as Mahjong.User
							}
						});
					} else {
						dispatch({
							type: 'actionSetAuthError',
							data: {
								error: 'Registreren mislukt'
							}
						});
					}
				});;
		};
	}
};

export const ActionLogin = {
	create(userName: string, password: string) {
		return (dispatch, getState) => {
			if (getState().auth.authenticate) {
				axios
					.post('/auth/login', {
						userName,
						password
					})
					.then(res => {
						if (res.data.success === true) {
							dispatch({
								type: 'actionSetAuthError',
								data: {
									error: undefined
								}
							});
							dispatch({
								type: 'actionSetUser',
								data: {
									user: res.data.data as Mahjong.User
								}
							});
						} else {
							dispatch({
								type: 'actionSetAuthError',
								data: {
									error: 'Onbekende naam/wachtwoord combinatie'
								}
							});
						}
					});
			} else {
				dispatch({
					type: 'actionSetUser',
					data: {
						user: {
							name: userName,
							id: userName
						}
					}
				});
			}
		};
	}
};

export const ActionLogout = {
	create() {
		return (dispatch, getState) => {
			if (getState().auth.authenticate) {
				axios
					.post('/auth/logout')
					.then(() => {
						dispatch({
							type: 'actionClearUser',
							data: {}
						});
					});
			} else {
				dispatch({
					type: 'actionClearUser',
					data: {}
				});
			}
		};
	}
};

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
