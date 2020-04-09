import React from 'react';

interface Props {
	name: string;
	games: Mahjong.Game[];
	enter(id: string): void;
	join(id: string): void;
}

export const Lobby = ({ name, games, enter, join }: Props) => {
	return (
		<div className="lobby">
			<h2>Lobby</h2>
			<div className="games">
				<h3>Spellen <a href="#" title="Nieuw spel toevoegen">(+)</a></h3>
				{
					games.map(({ id, chairs, title, creator }) => {
						const chairsTaken = chairs.reduce((m, c) => m + (c.player != null ? 1 : 0), 0)

						return (
							<div key={ id } className="list-game">
								<h4>
									<a href="#" onClick={ () => enter(id) }>
										{ title ?? 'Spel zonder naam' }
									</a>
								</h4>
								<p>Toegevoegd door { creator ?? 'anoniem' }</p>
								<h4>Spelers { chairsTaken < 4 ? `(nog ${ 4 - chairsTaken } nodig)` : null}</h4>
								<ul>
									{
										chairs.map(c => (
											c.player != null
												? (
													<li key={ c.id }>
														{
															c.player === name
																? <a href="#" onClick={ () => enter(id) }>{ c.player }</a>
																: c.player
														}
													</li>
												)
												: (
													<li key={ c.id }>
														<a href="#" onClick={ () => join(id) }>*lege stoel*</a>
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