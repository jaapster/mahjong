import { combineReducers } from 'redux';
import { tables } from './tables.reducer';
import { user } from './user.reducer';
import { settings } from './settings.reducer';

export const root = combineReducers(
	{
		settings,
		tables,
		user
	}
);