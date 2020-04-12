import React from 'react';
import bind from 'autobind-decorator';
import axios from 'axios';
import { Table } from '../table/cp-table';
import { Lobby } from '../lobby/cp-lobby';
import { Entrance } from '../lobby/cp-entrance';

interface State {
	name: string | null;
	table: Mahjong.Table | null;
	tables: Mahjong.Table[];
}

const Storage = {
	get() {
		return JSON.parse(localStorage.getItem('mahjong') ?? '{}');
	},

	setName(name: string) {
		localStorage.setItem('mahjong', JSON.stringify({
			...Storage.get(),
			name
		}));
	},

	setTable(table: string) {
		localStorage.setItem('mahjong', JSON.stringify({
			...Storage.get(),
			table
		}));
	}
};

@bind
export class App extends React.Component<any, State> {
	state = { name: null, table: null, tables: [] };

	private tableStream: any;
	private tablesStream: any;

	componentDidMount() {
		this.getTables();

		const { name, table } = Storage.get();

		this.setState({ name });

		this.tablesStream = new EventSource('/streams/tables');
		this.tablesStream.addEventListener('update', this.onTablesUpdate);

		if (table != null) {
			this.openTable(table);
		}
	}

	private openTable(id: string) {
		if (this.tableStream) {
			this.tableStream.close();
		}

		this.tableStream = new EventSource(`/streams/tables/${ id }`);
		this.tableStream.addEventListener('update', this.onTableUpdate);
		this.tableStream.addEventListener('delete', this.onTableDelete);

		Storage.setTable(id);
	}

	private joinTable(tableId: string, chairId: string) {
		const { name: player, tables } = this.state;
		const table = tables.find(table => table.id === tableId);

		axios.put(`/tables/${ tableId }`, {
			data: {
				...table,
				chairs: table.chairs.map(chair => (
					chair.id === chairId
						? { ...chair, player }
						: chair
				))
			}
		});
	}

	private onTableDelete() {
		if (this.tableStream) {
			this.tableStream.removeEventListener('update', this.onTableUpdate);
			this.tableStream.removeEventListener('delete', this.onTableDelete);
			this.tableStream.close();
		}

		this.setState({ table: null });

		Storage.setTable(undefined);
	}

	private getTables() {
		fetch('/tables')
			.then(response => response.json())
			.then(tables => this.setState({ tables }));
	}

	private onTablesUpdate(event) {
		this.setState({ tables: JSON.parse(event.data) });
	}

	private onTableUpdate(event) {
		this.setState({ table: JSON.parse(event.data) });
	}

	private createTable() {
		const { name } = this.state;
		axios.post('/tables', { creator: name });
	}

	private deleteTable(id: string) {
		axios.delete(`/tables/${ id }`);
	}

	private submitName(name: string) {
		this.setState({ name });
		Storage.setName(name);
	}

	private logout() {
		this.setState({ name: null });
	}

	render() {
		const { name, table, tables } = this.state;

		return (
			<>
				{
					name == null
						? (
							<>
								<h1>Mahjong</h1>
								<Entrance submit={ this.submitName } />
							</>
						)
						: table != null
							? (
								<Table
									table={ table }
									leaveTable={ this.onTableDelete }
									player={ name }
								/>
							)
							: (
								<>
									<Lobby
										openTable={ this.openTable }
										tables={ tables }
										joinTable={ this.joinTable }
										player={ name }
										createTable={ this.createTable }
										deleteTable={ this.deleteTable }
										logout={ this.logout }
									/>
								</>
							)
				}
			</>
		);
	}
}
