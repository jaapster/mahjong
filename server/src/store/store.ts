import { createStore, Store } from 'redux';
import { root } from './reducers/root.reducer';
import SSE from 'express-sse';

const $tables = new SSE([], 'connect');
const $table: { [id: string]: SSE } = {};
const cache: { [id: string]: Mahjong.Table } = {};
const store = createStore(root);

store.subscribe(() => {
	const { tables } = store.getState();

	// emit tables list sse
	$tables.send(tables, 'update');

	tables.forEach(table => {
		if (table !== cache[table.id]) {
			cache[table.id] = table;

			// emit table specific sse
			$table[table.id]?.send(table, 'update');
		}
	});
});

export const connectStore = (app: any) => {
	app.put('/dispatch', (req, res) => {
		const action = req.body;

		console.log(action.type);

		store.dispatch(action);

		res.send({ success: true });
	});

	app.get('/streams/tables', (req, res) => {
		const { tables } = store.getState();

		$tables.init(req, res);
		$tables.send(tables, 'update');
	});

	app.get('/streams/tables/:id', (req, res) => {
		const id = req.params.id;
		const { tables } = store.getState();

		if (!$table[id]) {
			$table[id] = new SSE({ success: true }, 'connect');
		}

		$table[id].init(req, res);
		$table[id].send(tables.find(table => table.id === id), 'update');
	});
};

