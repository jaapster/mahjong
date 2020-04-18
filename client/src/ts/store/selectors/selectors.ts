import { createSelector } from 'reselect';

export const selectUser = (store: Mahjong.Store) => {
	return store.auth.user;
};

export const selectUserName = (store: Mahjong.Store) => {
	return store.auth.user?.name;
};

export const selectAuthError = (store: Mahjong.Store) => {
	return store.auth.error;
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
