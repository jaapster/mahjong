import bind from 'autobind-decorator';
import React from 'react';
import axios from 'axios';
import { Chair } from './cp-chair';
import { Wall } from './cp-wall';
import { Center } from './cp-center';

import './ss-table.scss';

interface Props {
	player: string;
	reveal(id: string): void;
	table: Mahjong.Table;
}

interface DragDrop {
	id: string;
	tray: string;
	index: number,
}

interface State {
	startX: number;
	drag?: DragDrop,
	drop?: DragDrop
}

const getDragDrop = ({ target: { dataset: { tray, index }, id } }: any) => (
	tray != null
		? {
			id,
			tray,
			index: parseFloat(index)
		}
		: undefined
);

@bind
export class Table extends React.Component<Props, State> {
	private onDragStart(e: React.MouseEvent) {
		this.setState({
			startX: e.clientX,
			drag: getDragDrop(e)
		});
	}

	private onDragEnter(e: React.MouseEvent) {
		this.setState({
			drop: getDragDrop(e)
		});

		e.preventDefault();
	}

	private onDragOver(e: React.MouseEvent) {
		const { table } = this.props;
		const { startX, drag, drop } = this.state;

		if (drop.id === drag.id) {
			const space = Math.abs(e.clientX - startX);

			axios.put(`/tables/${ table.id }/game/tiles/${ drag.id }`, {
				data: {
						space: space < 20 ? space : 0
				}
			});
		}

		e.preventDefault();
	}

	private onDragLeave(e: React.MouseEvent) {
		e.preventDefault();
	}

	private onDragEnd({ clientX }: React.MouseEvent) {
		const { table } = this.props;
		const { startX, drag, drop } = this.state;

		if (drop != null) {
			console.log();

			axios.put(`/tables/${ table.id }/game/tiles/${ drag.id }`, {
				data: drop.tray === drag.tray && Math.abs(drop.index - drag.index) <= 1
					? {
						spaced: clientX > startX
					}
					: {
						tray: drop.tray,
						index: drop.index
					}
			});

			this.setState({
				drag: undefined,
				drop: undefined
			});
		}
	}

	private onClick({ target, shiftKey }: React.MouseEvent) {
		const { id, dataset, classList } = target as HTMLElement;

		if (classList.contains('tile') && shiftKey) {
			const { table } = this.props;

			axios.put(`/tables/${ table.id }/game/tiles/${ id }`, {
				data: {
					hidden: dataset.hidden === 'false'
				}
			});
		}
	}

	render() {
		const { table, player, reveal } = this.props;
		const { game: { tiles }, chairs } = table;
		const p = chairs.findIndex(c => c.player === player );

		return (
			<div
				className="table"
				onClick={ this.onClick }
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
								player={ player }
								reveal={ reveal }
								tiles={ tiles }
								transit={ table.transit }
							/>
						))
				}
				<Center
					tiles={ tiles }
					transit={ table.transit }
				/>
				<Wall tiles={ tiles } begin={ true } />
				<Wall tiles={ tiles } begin={ false } />
			</div>
		);
	}
};
