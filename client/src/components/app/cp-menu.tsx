import React from 'react';
import './cp-menu.scss';

export const Menu = ({ toggleTransitMode, startNewGame, close, table }: any) => {
	return (
		<div className="menu">
			<div className="menu-body">
				<a
					href="#"
					onClick={ () => {
						toggleTransitMode();
						close();
					} }
				>
					Zet doorschuiven { table.transit ? 'uit' : 'aan' }
				</a>
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