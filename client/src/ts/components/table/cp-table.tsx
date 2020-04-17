import bind from 'autobind-decorator';
import React from 'react';
import { connect } from 'react-redux';
import { Chair } from './cp-chair';
import { Wall } from './cp-wall';
import { Center } from './cp-center';
import { Notifications } from './cp-notifications';
import { Menu } from './cp-menu';
import {
	ActionMoveTile,
	ActionSpaceTile,
	ActionSetTileHidden,
	ActionRevealTiles
} from '../../store/actions/actions';
import {
	selectUserName,
	selectActiveTableId,
	selectActiveTable
} from '../../store/selectors/selectors';

import './ss-table.scss';

interface Props {
	id: string;
	player: string;
	table: Mahjong.Table;
	moveTile(tableId: string, tileId: string, tray: string, index: number): void;
	spaceTile(tableId: string, tileId: string, spaced: boolean): void;
	setSeated(tableId: string, chairId: string, seated: boolean): void;
	hideTile(tableId: string, tileId: string, hidden: boolean): void;
	revealRack(tableId: string, chairId: string, reveal: boolean): void;
}

interface DragDrop {
	id: string;
	tray: string;
	index: number,
}

interface State {
	startX: number;
	drag?: DragDrop;
	drop?: DragDrop;
	notification?: string;
	chairs: { [id: string]: string };
	showMenu: boolean;
}

interface State {
	table?: Mahjong.Table;
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
export class _Table extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			startX: 0,
			chairs: {},
			showMenu: false
		};
	}

	componentDidMount() {
		document.addEventListener('keyup', this.onKeyUp);
	}

	componentWillUnmount() {
		document.removeEventListener('keyup', this.onKeyUp);
	}

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
		e.preventDefault();
	}

	private onDragLeave(e: React.MouseEvent) {
		e.preventDefault();
	}

	private onDragEnd({ clientX }: React.MouseEvent) {
		const { id, moveTile, spaceTile } = this.props;
		const { startX, drag, drop } = this.state;

		if (drop != null) {
			const diff = drop.index - drag.index;

			if (drop.tray === drag.tray && diff >= 0 && diff <= 1) {
				spaceTile(id, drag.id, clientX > startX);
			} else {
				moveTile(id, drag.id, drop.tray, drop.index);
			}

			this.setState({
				drag: undefined,
				drop: undefined
			});
		}
	}

	private onClick({ target, shiftKey }: React.MouseEvent) {
		const { hideTile, id } = this.props;
		const { dataset, classList, id: tileId } = target as HTMLElement;

		if (classList.contains('tile') && shiftKey) {
			hideTile(id, tileId, dataset.hidden === 'false');
		}
	}

	private revealRack(chairId: string) {
		const { id, revealRack, table } = this.props;

		const chair = table.chairs.find(chair => chair.id === chairId);

		revealRack(id, chairId, !chair.reveal);
	}

	private onKeyUp(e: any) {
		if (e.key === 'Escape') {
			this.toggleMenu();
		}
	}

	private hideMenu() {
		this.setState({ showMenu: false });
	}

	private toggleMenu() {
		const { showMenu } = this.state;
		this.setState({ showMenu: !showMenu });
	}

	render() {
		const { table } = this.props;
		const { notification, showMenu } = this.state;

		if (!table) {
			return null;
		}

		const { player } = this.props;
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
								reveal={ this.revealRack }
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
				{
					showMenu
						? (
							<Menu
								close={ this.hideMenu }
								table={ table }
							/>
						)
						: null
				}
				<Notifications notification={ notification } />
			</div>
		);
	}
};

const mapStateToProps = (state: Mahjong.Store) => {
	return {
		player: selectUserName(state),
		id: selectActiveTableId(state),
		table: selectActiveTable(state)
	};
};

const mapDispatchToProps = (dispatch: any) => {
	return {
		moveTile(tableId: string, tileId: string, tray: string, index: number) {
			dispatch(ActionMoveTile.create(tableId, tileId, tray, index));
		},

		spaceTile(tableId: string, tileId: string, spaced: boolean) {
			dispatch(ActionSpaceTile.create(tableId, tileId, spaced));
		},

		hideTile(tableId: string, tileId: string, hidden: boolean) {
			dispatch(ActionSetTileHidden.create(tableId, tileId, hidden));
		},

		setSeated(tableId: string, chairId: string, seated: boolean) {
			dispatch(ActionSpaceTile.create(tableId, chairId, seated));
		},

		revealRack(tableId: string, chairId: string, reveal: boolean) {
			dispatch(ActionRevealTiles.create(tableId, chairId, reveal));
		}
	};
};

export const Table = connect(mapStateToProps, mapDispatchToProps)(_Table);
