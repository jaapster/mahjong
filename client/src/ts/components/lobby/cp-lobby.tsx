import React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Table } from '../table/cp-table';
import { selectUserName, selectActiveTableId, selectTables } from '../../store/selectors/selectors';
import { ActionLogout, ActionSetActiveTable, ActionJoinTable, ActionCreateTable, ActionDeleteTable } from '../../store/actions/actions';

import './ss-lobby.scss';

interface Props {
	player: string;
	logout(): void;
	activeTable: string;
	setActiveTable(id?: string): void;
	joinTable(tableId: string, chairId: string, player: string): void;
	tables: Mahjong.Table[];
	createTable(creator: string): void;
	deleteTable(id: string): void;
}

export const _Lobby = ({
	logout,
	player,
	activeTable,
	setActiveTable,
	joinTable,
	tables,
	createTable,
	deleteTable
}: Props) => {
	return activeTable == null
		? (
			<div className="lobby">
				<h2>Lobby</h2>
				<p>
					Spelernaam: { player }&nbsp;
					<a href="#" onClick={ logout }>
						(aanpassen)
					</a>
				</p>
				<div className="tables">
					<h3>
						<span>Tafels</span>
						<a href="#" onClick={ () => createTable(player) } title="Nieuwe tafel">
							(+)
						</a>
					</h3>
					{
						tables.map((table) => {
							const { id, chairs } = table;
							const chairsTaken = chairs.reduce((m, c) => m + (c.player != null ? 1 : 0), 0);
							const inThisGame = chairs.find(c => c.player === player) || player === 'zork';

							return (
								<div key={ id } className="list-game">
									<h4>
										{
											inThisGame
												? (
													<a
														href="#"
														onClick={ () => setActiveTable(id) }
													>
														{ chairs[0].player }'s tafel
													</a>
												)
												: `${ chairs[0].player }'s tafel`
										}
									</h4>
									<a href="#" onClick={ () => deleteTable(id) }>X</a>

									<h4>Spelers { chairsTaken < 4 ? `(nog ${ 4 - chairsTaken } nodig)` : null}</h4>
									<ul>
										{
											chairs.map(c => (
												c.player != null
													? (
														<li key={ c.id }>
															{ c.player }
														</li>
													)
													: (
														<li key={ c.id }>
															{
																inThisGame
																	? <span>...</span>
																	: (
																		<a
																			href="#"
																			onClick={ () => joinTable(id, c.id, player) }
																		>
																			[+]
																		</a>
																	)
															}
														</li>
													)
											))
										}
									</ul>
								</div>
							);
						})
					}
				</div>
			</div>
		)
		: <Table />;
};

const mapStateToProps = (state: Mahjong.Store) => {
	return {
		player: selectUserName(state),
		activeTable: selectActiveTableId(state),
		tables: selectTables(state)
	};
};

const mapDispatchToProps = (dispatch: Dispatch) => {
	return {
		logout() {
			dispatch(ActionLogout.create());
		},

		setActiveTable(id?: string) {
			dispatch(ActionSetActiveTable.create(id));
		},

		createTable(creator: string) {
			dispatch(ActionCreateTable.create(creator));
		},

		deleteTable(id: string) {
			dispatch(ActionDeleteTable.create(id));
		},

		joinTable(tableId: string, chairId: string, player: string) {
			dispatch(ActionJoinTable.create(tableId, chairId, player));
		}
	};
};

export const Lobby = connect(mapStateToProps, mapDispatchToProps)(_Lobby);