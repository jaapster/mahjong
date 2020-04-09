import React from 'react';

interface Props {
	name: string;
	games: Mahjong.Game[];
	enter(id: string): void;
	join(id: string): void;
	chairs: string[];
}

export const Lobby = ({ name, games, enter, join, chairs }: Props) => {
	return (
		<div className="lobby">
			<h2>Lobby</h2>
			<div className="games">
				<h3>Spellen <a href="#" title="Nieuw spel toevoegen">(+)</a></h3>
				{
					games.map(({ id, chairs: ch, title, creator }) => {
						const chairsTaken = ch.reduce((m, c) => m + (c.player != null ? 1 : 0), 0);
						const inThisGame = ch.find(c => chairs.find(v => v === c.id) != null) != null;

						return (
							<div key={ id } className="list-game">
								<h4>
									{
										inThisGame
											? (
												<a href="#" onClick={ () => enter(id) }>
													{ title ?? 'Spel zonder naam' } (aan tafel)
												</a>
											)
											: <span>{ title ?? 'Spel zonder naam' }</span>
									}
								</h4>
								<p>Toegevoegd door { creator ?? 'anoniem' }</p>
								<h4>Spelers { chairsTaken < 4 ? `(nog ${ 4 - chairsTaken } nodig)` : null}</h4>
								<ul>
									{
										ch.map(c => (
											c.player != null
												? (
													<li key={ c.id }>
														{
															chairs.find(v => v === c.id) != null
																? <a href="#" onClick={ () => enter(id) }>{ c.player }</a>
																: c.player
														}
													</li>
												)
												: (
													<li key={ c.id }>
														{
															inThisGame
																? <span>[ ]</span>
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