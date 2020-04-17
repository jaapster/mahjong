const STATE = {};

export const user = (state: Mahjong.User = STATE, action: any): Mahjong.User => {
	if (action.type === 'actionLogin') {
		const {
			userName
		} = action.data;

		return {
			name: userName
		};
	}

	if (action.type === 'actionLogout') {
		return {
			name: undefined
		};
	}

	if (action.type === 'actionRestore') {
		const {
			userName
		} = action.data;

		return {
			name: userName
		};
	}

	return state;
};