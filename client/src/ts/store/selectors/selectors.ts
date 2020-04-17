import { createSelector } from 'reselect';

export const selectUserName = (store: Mahjong.Store) => {
	return store.user.name;
};

export const selectTables = (store: Mahjong.Store) => {
	return store.tables;
};

export const selectActiveTableId = (store: Mahjong.Store) => {
	return store.settings.activeTable;
};

export const selectActiveTable = createSelector(
	[selectTables, selectActiveTableId],
	(tables, activeTableId) => tables.find(table => table.id === activeTableId)
);
