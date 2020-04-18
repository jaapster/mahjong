const STATE = {};

export const auth = (state: Mahjong.Auth = STATE, action: any): Mahjong.Auth => {
	if (action.type === 'actionLogin') {
		const {
			name,
			id
		} = action.data;

		return {
			user: {
				name,
				id
			}
		};
	}

	if (action.type === 'actionLogout') {
		return {
			user: undefined
		};
	}

	if (action.type === 'actionSetAuthError') {
		const {
			error
		} = action.data;

		return {
			error
		};
	}

	if (action.type === 'actionSetUser') {
		const {
			user
		} = action.data;

		return {
			user
		};
	}

	return state;
};