import React from 'react';
import bind from 'autobind-decorator';
import axios from 'axios';
import { Table } from '../table/cp-table';
import { Lobby } from '../lobby/cp-lobby';
import { Entrance } from '../lobby/cp-entrance';
import { Menu } from './cp-menu';

interface State {
	player: string | null;
	table: Mahjong.Table | null;
	tables: Mahjong.Table[];
	showMenu: boolean;
}

const Storage = {
	get() {
		return JSON.parse(localStorage.getItem('mahjong') ?? '{}');
	},

	setPlayer(player: string) {
		localStorage.setItem('mahjong', JSON.stringify({
			...Storage.get(),
			player
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
	state = { player: null, table: null, tables: [], showMenu: false };

	private tableStream: any;
	private tablesStream: any;

	componentDidMount() {
		this.getTables().then(() => {
			const { player, table } = Storage.get();

			this.setState({ player });

			this.tablesStream = new EventSource('/streams/tables');
			this.tablesStream.addEventListener('update', this.onTablesUpdate);

			if (table != null) {
				this.openTable(table);
			}
		});

		// @ts-ignore
		window.transit = this.transit;

		document.addEventListener('keyup', this.onKeyUp);

		window.onbeforeunload = () => {
			const { table, player } = this.state;

			const chair = table?.chairs.find(chair => chair.player === player);

			if (chair) {
				axios.put(`/tables/${ table.id }/chairs/${ chair.id }`, {
					data: {
						...chair,
						seated: false
					}
				});
			}
		};
	}

	private onKeyUp(e: any) {
		if (e.key === 'Escape') {
			this.toggleMenu();
		}
	}

	private openTable(id: string) {
		const { player, tables } = this.state;

		if (tables.find(table => table.id === id)) {
			if (this.tableStream) {
				this.tableStream.close();
			}

			this.tableStream = new EventSource(`/streams/tables/${ id }`);
			this.tableStream.addEventListener('update', this.onTableUpdate);
			this.tableStream.addEventListener('delete', this.onTableDelete);

			const table = tables.find(table => table.id === id);
			const chair = table.chairs.find(chair => chair.player === player);

			axios.put(`/tables/${ id }/chairs/${ chair.id }`, {
				data: {
					...chair,
					seated: true
				}
			});

			Storage.setTable(id);
		}
	}

	private joinTable(tableId: string, chairId: string) {
		const { player, tables } = this.state;
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
		const { table, player } = this.state;

		if (this.tableStream) {
			this.tableStream.removeEventListener('update', this.onTableUpdate);
			this.tableStream.removeEventListener('delete', this.onTableDelete);
			this.tableStream.close();
		}

		this.setState({ table: null });

		const chair = table.chairs.find(chair => chair.player === player);

		axios.put(`/tables/${ table.id }/chairs/${ chair.id }`, {
			data: {
				...chair,
				seated: false
			}
		});

		Storage.setTable(undefined);
	}

	private getTables() {
		return fetch('/tables')
			.then(response => response.json())
			.then(tables => {
				this.setState({ tables });
			});
	}

	private onTablesUpdate(event) {
		this.setState({ tables: JSON.parse(event.data) });
	}

	private onTableUpdate(event) {
		this.setState({ table: JSON.parse(event.data) });
	}

	private createTable() {
		const { player } = this.state;
		axios.post('/tables', { creator: player });
	}

	private deleteTable(id: string) {
		axios.delete(`/tables/${ id }`);
	}

	private submitName(player: string) {
		this.setState({ player });
		Storage.setPlayer(player);
	}

	private logout() {
		this.setState({ player: null });
	}

	private reveal(id: string) {
		const { table } = this.state;
		const chair = table.chairs.find(chair => chair.id === id);

		axios.put(`/tables/${ table.id }/chairs/${ id }`, {
			data: {
				...chair,
				reveal: !chair.reveal
			}
		});
	}

	private toggleTransitMode() {
		const { table } = this.state;

		axios.put(`/tables/${ table.id }`, {
			data: {
				...table,
				transit: !table.transit
			}
		});
	}

	private hideMenu() {
		this.setState({ showMenu: false });
	}

	private toggleMenu() {
		const { showMenu } = this.state;
		this.setState({ showMenu: !showMenu });
	}

	private startNewGame() {
		const { table } = this.state;

		axios.post(`/tables/${ table.id }/game`);
	}

	render() {
		const { player, table, tables, showMenu } = this.state;

		return (
			<>
				{
					player == null
						? (
							<>
								<h1>Mahjong</h1>
								<Entrance submit={ this.submitName } />
							</>
						)
						: table != null
							? (
								<>
									<Table
										table={ table }
										leaveTable={ this.onTableDelete }
										player={ player }
										reveal={ this.reveal }
									/>
									{
										showMenu
											? (
												<Menu
													table={ table }
													startNewGame={ this.startNewGame }
													toggleTransitMode={ this.toggleTransitMode }
													close={ this.hideMenu }
												/>
											)
											: null
									}
								</>
							)
							: (
								<Lobby
									openTable={ this.openTable }
									tables={ tables }
									joinTable={ this.joinTable }
									player={ player }
									createTable={ this.createTable }
									deleteTable={ this.deleteTable }
									logout={ this.logout }
								/>
							)
				}
			</>
		);
	}
}
