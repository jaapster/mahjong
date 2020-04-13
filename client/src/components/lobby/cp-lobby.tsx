import React from 'react';
import './ss-lobby.scss';

interface Props {
	createTable(): void;
	deleteTable(id: string): void;
	joinTable(tableId: string, chairId: string): void;
	openTable(id: string): void;
	player: string;
	tables: Mahjong.Table[];
	logout(): void;
}

export const Lobby = ({
	createTable,
	deleteTable,
	joinTable,
	openTable,
	player,
	tables,
	logout
}: Props) => {
	return (
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
					<a href="#" onClick={ createTable } title="Nieuwe tafel">
						(+)
					</a>
				</h3>
				{
					tables.map(({ id, chairs }) => {
						const chairsTaken = chairs.reduce((m, c) => m + (c.player != null ? 1 : 0), 0);
						const inThisGame = chairs.find(c => c.player === player);

						return (
							<div key={ id } className="list-game">
								<h4>
									{
										inThisGame
											? (
												<a
													href="#"
													onClick={ () => openTable(id) }
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
																		onClick={ () => joinTable(id, c.id) }
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
};