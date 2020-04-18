import { combineReducers } from 'redux';
import { tables } from '../../../../../common/src/reducers/tables.reducer';
import { auth } from './auth.reducer';
import { settings } from './settings.reducer';

export const root = combineReducers(
	{
		settings,
		tables,
		auth
	}
);