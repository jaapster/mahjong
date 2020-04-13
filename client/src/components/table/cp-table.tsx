import bind from 'autobind-decorator';
import React from 'react';
import axios from 'axios';
import { Chair } from './cp-chair';
import { Wall } from './cp-wall';
import { Exit } from './cp-exit';
import { Center } from './cp-center';
import './cp-table.scss';

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

		if (dropTarget && dropTarget.id && dropTarget.id !== dragged) {
			if ((dropTarget as HTMLElement).classList.contains('tile')) {
				const parent: HTMLElement = dropTarget.parentNode as HTMLElement;
				const index = Array.from(parent.children).indexOf(dropTarget);

				axios.put(`/tables/${ table.id }/game/tiles/${ dragged }`, {
					data: {
						tray: parent.id,
						index: parent.id === 't1'
							? Array.from(parent.children).length
							: index
					}
				});
			} else {
				axios.put(`/tables/${ table.id }/game/tiles/${ dragged }`, {
					data: {
						tray: dropTarget.id,
						index: Array.from(dropTarget.children).length
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
							/>
						))
				}
				<Center tiles={ tiles } />
				<Wall tiles={ tiles } />
				<Exit onClick={ this.leaveTable } />
			</div>
		);
	}
};
