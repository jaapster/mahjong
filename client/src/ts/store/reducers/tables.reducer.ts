const STATE = {
	tables: []
};

export const tables = (state: Mahjong.Tables = STATE, action: any): Mahjong.Tables => {
	if (action.type === 'actionSetTables') {
		const {
			tables
		} = action.data;

		return {
			...state,
			tables
		};
	}

	return state;
};
