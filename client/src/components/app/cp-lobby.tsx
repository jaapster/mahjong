import React from 'react';

interface Props {
	player: string;
	games: Mahjong.Game[];
	enter(id: string): void;
	join(id: string): void;
	createGame(): void;
	deleteGame(id: string): void;
}

export const Lobby = ({ games, enter, join, createGame, deleteGame, player }: Props) => {
	return (
		<div className="lobby">
			<h2>Lobby</h2>
			<div className="games">
				<h3>Spellen <a href="#" onClick={ createGame } title="Nieuw spel toevoegen">(+)</a></h3>
				{
					games.map(({ id, chairs, title, creator }) => {
						const chairsTaken = chairs.reduce((m, c) => m + (c.player != null ? 1 : 0), 0);
						const inThisGame = chairs.find(c => c.player === player);

						return (
							<div key={ id } className="list-game">
								<h4>
									<a href="#" onClick={ () => enter(id) }>{ title || 'Spel zonder naam' }</a>
									&nbsp;<span>({ creator ?? 'anoniem' })</span>
								</h4>
								<a href="#" onClick={ () => deleteGame(id) }>X</a>

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
																: <a href="#" onClick={ () => join(id) }>[+]</a>
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