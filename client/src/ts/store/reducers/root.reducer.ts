import { combineReducers } from 'redux';
import { tables } from './tables.reducer';
import { user } from './user.reducer';

export const root = combineReducers(
	{
		tables,
		user
	}
);