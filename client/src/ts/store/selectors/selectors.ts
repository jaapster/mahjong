import { createSelector } from 'reselect';

export const selectUserName = (store: Mahjong.Store) => {
	return store.user.name;
};

export const selectTables = (store: Mahjong.Store) => {
	return store.tables.tables;
};

export const selectActiveTableId = (store: Mahjong.Store) => {
	return store.tables.activeTable;
};

export const selectActiveTable = createSelector(
	[selectTables, selectActiveTableId],
	(tables, activeTableId) => tables.find(table => table.id === activeTableId)
);
