import React from 'react';
import './ss-menu.scss';

export const Menu = ({ toggleTransitMode, startNewGame, close, table, leaveTable }: any) => {
	return (
		<div className="menu">
			<div className="menu-body">
				<a
					href="#"
					onClick={ () => {
						leaveTable(table.id);
						close();
					} }
				>
					Naar de lobby
				</a>
				{
					table.transit
						? table.game.tiles.filter(tile => tile.tray.match('transit')).length
							? <a href="#" style={ { opacity: 0.3 } }>Zet doorschuiven uit</a>
							: (
								<a
									href="#"
									onClick={ () => {
										toggleTransitMode();
										close();
									} }
								>
									Zet doorschuiven uit
								</a>
							)
						: (
							<a
								href="#"
								onClick={ () => {
									toggleTransitMode();
									close();
								} }
							>
								Zet doorschuiven aan
							</a>
						)
				}
				<a
					href="#"
					onClick={ () => {
						startNewGame();
						close();
					} }
				>
					Nieuw spel beginnen
				</a>
			</div>
		</div>
	);
};