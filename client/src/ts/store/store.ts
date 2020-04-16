import {
	applyMiddleware,
	createStore,
} from 'redux';

import thunk from 'redux-thunk';

import { Storage } from '../services/sv-storage';
import { root } from './reducers/root.reducer';
import { ActionSetTables } from './actions/actions';

const getStoredData = (): Mahjong.Store => {
	const { player, table } = Storage.get();

	return {
		tables: {
			tables: [],
			activeTable: table
		},
		user: {
			name: player
		}
	};
};

const persist = () => {
	const { user: { name }, tables: { activeTable } } = store.getState();

	Storage.set({
		player: name,
		table: activeTable
	});
};

export const store = createStore(root, getStoredData(), applyMiddleware(thunk));

store.subscribe(persist);

export const getState = () => store.getState();

this.stream = new EventSource('/streams/tables');
this.stream.addEventListener('update', (event) => store.dispatch(ActionSetTables.create({ tables: JSON.parse(event.data) })));

fetch('/tables')
	.then(response => response.json())
	.then(tables => {
		store.dispatch(ActionSetTables.create({ tables }));
	});

// @ts-ignore
window.getState = getState;