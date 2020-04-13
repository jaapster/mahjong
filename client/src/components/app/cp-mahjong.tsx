import React from 'react';
import bind from 'autobind-decorator';
import axios from 'axios';
import { Table } from '../table/cp-table';
import { Lobby } from '../lobby/cp-lobby';
import { Entrance } from '../lobby/cp-entrance';
import { Menu } from './cp-menu';

import './cp-notification.scss';

interface State {
	player: string | null;
	table: Mahjong.Table | null;
	tables: Mahjong.Table[];
	showMenu: boolean;
	notification?: string
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
	state = { player: null, table: null, tables: [], showMenu: false, notification: undefined };

	private tableStream: any;
	private tablesStream: any;
	private timeout: any;

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
			this.tableStream.addEventListener('tile-move', this.onTileMove);

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
			this.tableStream.removeEventListener('tile-move', this.onTileMove);
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

	private onTileMove(event) {
		const { tile, from, to } = JSON.parse(event.data);

		if (from !== to) {
			let str;
			const { table, player } = this.state;
			const { title } = table.game.tiles.find(t => t.id === tile);

			const map = {
				'a0': table.chairs.find(chair => chair.id === 'a').player,
				'b0': table.chairs.find(chair => chair.id === 'b').player,
				'c0': table.chairs.find(chair => chair.id === 'c').player,
				'd0': table.chairs.find(chair => chair.id === 'd').player,
				'a1': table.chairs.find(chair => chair.id === 'a').player,
				'b1': table.chairs.find(chair => chair.id === 'b').player,
				'c1': table.chairs.find(chair => chair.id === 'c').player,
				'd1': table.chairs.find(chair => chair.id === 'd').player
			};

			if (map[from] === player || map[to] === player) {
				return;
			}

			if (from === 't0') {
				// from wall
				str = `${ map[to] ?? 'Een dummy' } pakt een steen van de muur`;
			} else if (from === 't1') {
				// from table
				str = `${ map[to] ?? 'Een dummy' } pakt een "${ title }" van de tafel`;
			} else if (to === 't1') {
				// to table
				str = `${ map[from] ?? 'Een dummy' } legt een "${ title }" op de tafel`;
			}

			this.setState({ notification: str });

			clearTimeout(this.timeout);

			this.timeout = setTimeout(() => this.setState({ notification: undefined }), 5000);
		}
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
		const { player, table, tables, showMenu, notification } = this.state;

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
				<div className="notifications">
					{
						notification
							? (
								<div className="notification">
									{ notification }
								</div>
							)
							: null
					}
				</div>
			</>
		);
	}
}
