import { Action } from 'redux';
import { ActionSetActiveTable, ActionSetTables } from '../actions/actions';

const STATE = {
	tables: []
};

export const tables = (state: Mahjong.Tables = STATE, action: Action): Mahjong.Tables => {
	if (ActionSetActiveTable.validate(action)) {
		const {
			id
		} = ActionSetActiveTable.data(action);

		return {
			...state,
			activeTable: id
		};
	}

	if (ActionSetTables.validate(action)) {
		const {
			tables
		} = ActionSetTables.data(action);

		return {
			...state,
			tables
		};
	}

	return state;
};
