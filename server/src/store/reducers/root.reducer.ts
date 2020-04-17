import { combineReducers } from 'redux';
import { tables } from '../../../../common/src/reducers/tables.reducer';

export const root = combineReducers<Mahjong.Store>({
	tables
});
