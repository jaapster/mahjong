const STATE = {
	size: 1
};

export const settings = (state: Mahjong.Settings = STATE, action: any): Mahjong.Settings => {
	if (action.type === 'actionSetSize') {
		const {
			size
		} = action.data;

		return {
			...state,
			size
		};
	}

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
		console.log('restore it');
		const {
			table
		} = action.data;

		return {
			...state,
			activeTable: table
		};
	}

	return state;
};
