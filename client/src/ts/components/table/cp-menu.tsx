import React from 'react';
import { connect } from 'react-redux';
import {
	ActionSetActiveTable,
	ActionToggleTransit,
	ActionNewGame,
	ActionLogout,
	ActionSetSeated
} from '../../store/actions/actions';

import './ss-menu.scss';

interface AttributeProps {
	close(): void;
	table: Mahjong.Table;
	chair: string;
}

interface MappedProps {
	toggleTransit(tableId: string): void;
	startNewGame(tableId: string): void;
	leave(tableId: string, chairId: string): void;
	logout(): void;
}

export const _Menu = ({ toggleTransit, startNewGame, close, table, leave, logout, chair }: MappedProps & AttributeProps) => {
	const tilesInTransit = table.game.tiles.filter(tile => tile.tray.match('transit')).length;

	return (
		<div className="menu">
			<div className="menu-body">
				<a
					href="#"
					onClick={ () => {
						leave(table.id, chair);
						close();
					} }
				>
					Naar de lobby
				</a>
				<a
					href="#"
					onClick={ () => {
						logout();
						//close();
					} }
				>
					Uitloggen
				</a>
				<a
					href="#"
					onClick={
						!tilesInTransit
							? () => {
								toggleTransit(table.id);
								close();
							}
							: undefined
					}
					style={ { opacity: tilesInTransit ? 0.3 : 1 } }
				>
					Zet doorschuiven { table.transit ? 'uit' : 'aan' }
				</a>
				<a
					href="#"
					onClick={ () => {
						startNewGame(table.id);
						close();
					} }
				>
					Nieuw spel beginnen
				</a>
			</div>
		</div>
	);
};

const mapDispatchToProps = (dispatch: any): MappedProps => {
	return {
		leave(tableId: string, chairId: string) {
			dispatch(ActionSetActiveTable.create());
			dispatch(ActionSetSeated.create(tableId, chairId, false));
		},

		logout() {
			dispatch(ActionLogout.create());
		},

		toggleTransit(tableId: string) {
			dispatch(ActionToggleTransit.create(tableId));
		},

		startNewGame(tableId: string) {
			dispatch(ActionNewGame.create(tableId));
		}
	};
};

export const Menu = connect(null, mapDispatchToProps)(_Menu);