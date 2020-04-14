import bind from 'autobind-decorator';
import React from 'react';
import axios from 'axios';
import { Chair } from './cp-chair';
import { Wall } from './cp-wall';
import { Exit } from './cp-exit';
import { Center } from './cp-center';
import './ss-table.scss';

interface Props {
	table: Mahjong.Table;
	player: string;
	leaveTable(id: string): void;
	reveal(id: string): void;
}

interface State {
	dragged?: string;
	dropTarget?: HTMLElement;
}

@bind
export class Table extends React.Component<Props, State> {
	private onDragStart(e) {
		this.setState({ dragged: e.target.id });
	}

	private onDragEnter(e) {
		this.setState({ dropTarget: e.nativeEvent.target });
		e.preventDefault();
	}

	private onDragLeave(e) {
		e.preventDefault();
	}

	private onDragOver(e) {
		e.preventDefault();
	}

	private onDragEnd(e) {
		const { table } = this.props;
		const { dropTarget, dragged } = this.state;

		if (dropTarget?.id && dropTarget.id !== dragged) {
			let target = dropTarget as HTMLElement;
			let index = Array.from(dropTarget.children).length;

			if (target.classList.contains('tile')) {
				target = dropTarget.parentNode as HTMLElement;
				index = Array.from(target.children).indexOf(dropTarget) - 1;
			}

			if (target.classList.contains('before')) {
				target = dropTarget.parentNode as HTMLElement;
				index = 0;
			}

			if (target.id === 't0-begin') {
				index = 0;
			}

			if (target.id === 't0-end') {
				index = table.game.tiles.filter(tile => tile.tray === 't0').length;
			}

			const tray = target.id;

			if (tray) {
				axios.put(`/tables/${ table.id }/game/tiles/${ dragged }`, {
					data: {
						tray: tray.match('t0') ? 't0' : tray,
						index
					}
				});
			}
		}

		this.setState({
			dragged: undefined,
			dropTarget: undefined
		});
	}

	private leaveTable() {
		const { table: { id }, leaveTable } = this.props;
		leaveTable(id);
	}

	render() {
		const { table, player, reveal } = this.props;
		const { game: { tiles }, chairs } = table;
		const p = chairs.findIndex(c => c.player === player );

		return (
			<div
				className="table"
				onDragEnd={ this.onDragEnd }
				onDragEnter={ this.onDragEnter }
				onDragLeave={ this.onDragLeave }
				onDragOver={ this.onDragOver }
				onDragStart={ this.onDragStart }
			>
				{
					chairs
						.slice(p)
						.concat(chairs.slice(0, p))
						.map((c, i) => (
							<Chair
								chair={ c }
								index={ i }
								key={ c.id }
								tiles={ tiles }
								reveal={ reveal }
								transit={ table.transit }
								player={ player }
							/>
						))
				}
				<Center
					tiles={ tiles }
					transit={ table.transit }
				/>
				<Wall tiles={ tiles } begin={ true } />
				<Wall tiles={ tiles } begin={ false } />
				{/* <Exit onClick={ this.leaveTable } /> */}
			</div>
		);
	}
};
