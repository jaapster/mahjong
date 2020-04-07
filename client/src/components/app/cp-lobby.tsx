import React from 'react';

interface Props {
	games: Mahjong.Game[];
	selectGame(id: string): void;
}

export const Lobby = ({ games, selectGame }: Props) => {
	return (
		<div className="lobby">
			<h2>Lobby</h2>
			<h3>Games</h3>
			{
				games.map(({ id, players }) => (
					<div key={ id } className="game">
						<h4>
							<a href="#" onClick={ () => selectGame(id) }>
								{ id }
							</a>
						</h4>
						<h4>Players</h4>
						{
							players.map(p => (
								<p key={ p.name } className="player">
									{ p.name }
								</p>
							))
						}
					</div>
				))
			}
		</div>
	)
};