const STATE = {};

export const settings = (state: Mahjong.Settings = STATE, action: any): Mahjong.Settings => {
	if (action.type === 'actionSetActiveTable') {
		const {
			id
		} = action.data;

		return {
			...state,
			activeTable: id
		};
	}

	if (action.type === 'actionRestore') {
		const {
			table
		} = action.data;

		return {
			...state,
			// activeTable: table
		};
	}

	return state;
};
