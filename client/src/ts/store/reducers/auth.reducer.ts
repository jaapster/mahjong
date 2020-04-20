const STATE: Mahjong.Auth = {
	authenticate: false,
	// user: {
	// 	name: 'jaap',
	// 	id: '1'
	// }
};

export const auth = (state: Mahjong.Auth = STATE, action: any): Mahjong.Auth => {
	if (action.type === 'actionSetUser') {
		const {
			user
		} = action.data;

		return {
			...state,
			user
		};
	}

	if (action.type === 'actionClearUser') {
		return {
			...state,
			user: undefined
		};
	}

	if (action.type === 'actionSetAuthError') {
		const {
			error
		} = action.data;

		return {
			...state,
			error
		};
	}

	return state;
};