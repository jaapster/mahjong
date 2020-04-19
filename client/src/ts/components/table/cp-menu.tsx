import React from 'react';
import { connect } from 'react-redux';
import {
	ActionSetActiveTable,
	ActionToggleTransit,
	ActionNewGame,
	ActionLogout
} from '../../store/actions/actions';

import './ss-menu.scss';

interface AttributeProps {
	close(): void;
	table: Mahjong.Table;
}

interface MappedProps {
	toggleTransit(tableId: string): void;
	startNewGame(tableId: string): void;
	leave(): void;
	logout(): void;
}

export const _Menu = ({ toggleTransit, startNewGame, close, table, leave, logout }: MappedProps & AttributeProps) => {
	const tilesInTransit = table.game.tiles.filter(tile => tile.tray.match('transit')).length;

	return (
		<div className="menu">
			<div className="menu-body">
				<a
					href="#"
					onClick={ () => {
						leave();
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
		leave() {
			dispatch(ActionSetActiveTable.create());
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