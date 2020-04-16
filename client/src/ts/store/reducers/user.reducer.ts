import { Action } from 'redux';
import { ActionLogin, ActionLogout } from '../actions/actions';

const STATE = {};

export const user = (state: Mahjong.User = STATE, action: Action): Mahjong.User => {
	if (ActionLogin.validate(action)) {
		const {
			userName
		} = ActionLogin.data(action);

		return {
			name: userName
		};
	}

	if (ActionLogout.validate(action)) {
		return {
			name: undefined
		};
	}

	return state;
};