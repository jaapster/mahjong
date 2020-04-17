import React from 'react';
import { connect } from 'react-redux';
import {
	ActionSetActiveTable,
	ActionSetTransit,
	ActionNewGame
} from '../../store/actions/actions';

import './ss-menu.scss';

interface AttributeProps {
	close(): void;
	table: Mahjong.Table;
}

interface MappedProps {
	setTransit(tableId: string, transit: boolean): void;
	startNewGame(tableId: string): void;
	leave(): void;
}

export const _Menu = ({ setTransit, startNewGame, close, table, leave }: MappedProps & AttributeProps) => {
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
				{
					table.transit
						? table.game.tiles.filter(tile => tile.tray.match('transit')).length
							? <a href="#" style={ { opacity: 0.3 } }>Zet doorschuiven uit</a>
							: (
								<a
									href="#"
									onClick={ () => {
										setTransit(table.id, false);
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
									setTransit(table.id, true);
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

		setTransit(tableId: string, transit: boolean) {
			dispatch(ActionSetTransit.create(tableId, transit));
		},

		startNewGame(tableId: string) {
			dispatch(ActionNewGame.create(tableId));
		}
	};
};

export const Menu = connect(null, mapDispatchToProps)(_Menu);