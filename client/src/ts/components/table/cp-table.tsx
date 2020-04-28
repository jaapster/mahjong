import bind from 'autobind-decorator';
import React from 'react';
import { connect } from 'react-redux';
import { Chair } from './cp-chair';
// import { Wall } from './cp-wall';
import { Center } from './cp-center';
import { Notifications } from './cp-notifications';
import { Menu } from './cp-menu';
import {
	ActionMoveTile,
	ActionSpaceTile,
	ActionToggleReveal,
	ActionToggleTileHidden,
	ActionSetActiveTable,
	ActionSetSeated
} from '../../store/actions/actions';
import {
	selectUserName,
	selectActiveTableId,
	selectActiveTable
} from '../../store/selectors/selectors';

import './ss-table.scss';
import { Exit } from './cp-exit';

interface MappedProps {
	id: string;
	player: string;
	table: Mahjong.Table;
}

interface DispatchProps {
	moveTile(tableId: string, tileId: string, tray: string, index: number): void;
	setSeated(tableId: string, chairId: string, seated: boolean): void;
	spaceTile(tableId: string, tileId: string, spaced: boolean): void;
	toggleReveal(tableId: string, chairId: string): void;
	toggleTileHidden(tableId: string, tileId: string): void;
	leave(tableId: string, chairId: string): void;
}

type Props = MappedProps & DispatchProps;

interface DragDrop {
	id: string;
	tray: string;
	index: number,
}

interface State {
	startX: number;
	drag?: DragDrop;
	drop?: DragDrop;
	notification?: any;
	showNotification?: string;
	chairs: { [id: string]: string };
	showMenu: boolean;
	startTimer: boolean;
	__prevProps: Props;
}

interface State {
	table?: Mahjong.Table;
}

const getDragDrop = ({ target: { dataset: { tray, index }, id } }: any) => {
	return tray != null
		? {
			id,
			tray,
			index: parseFloat(index)
		}
		: undefined;
};

@bind
export class _Table extends React.Component<Props, State> {
	static getDerivedStateFromProps(nextProps: Props, prevState: State) {
		const { game: { tiles: nextTiles, id: nextId } } = nextProps.table;
		const { game: { tiles: prevTiles, id: prevId } } = prevState.__prevProps.table;

		const diff = nextId !== prevId || nextTiles === prevTiles
			? undefined
			: nextTiles.reduce((m: any, next) => {
				const prev = prevTiles.find(tile => tile.id === next.id);

				if (prev.tray !== next.tray && prev.tray[0] !== next.tray[0]) {
					{
						return {
							from: prev.tray,
							title: prev.title,
							to: next.tray
						};
					}
				}

				return m;
			}, undefined);

		return {
			...prevState,
			__prevProps: nextProps,
			notification: diff ?? prevState.notification,
			startTimer: diff != null
		};
	}

	private timer: any;

	constructor(props: Props) {
		super(props);

		this.state = {
			startX: 0,
			chairs: {},
			showMenu: false,
			startTimer: false,
			__prevProps: props
		};
	}

	componentDidMount() {
		document.addEventListener('keyup', this.onKeyUp);
	}

	componentDidUpdate() {
		const { startTimer } = this.state;

		if (startTimer) {
			this.startNotificationTimer();
		}
	}

	componentWillUnmount() {
		document.removeEventListener('keyup', this.onKeyUp);
		clearTimeout(this.timer);
	}

	private onDragStart(e: React.MouseEvent) {
		this.setState({
			startX: e.clientX,
			drag: getDragDrop(e)
		});

		// const target = e.target as HTMLElement;
		// setTimeout(() => { target.style.display = 'none'; });
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

	private onDragEnd(e: React.MouseEvent) {
		const { clientX } = e;
		const { id, moveTile, spaceTile } = this.props;
		const { startX, drag, drop } = this.state;

		if (drop != null) {
			const diff = drop.index - drag.index;

			if (drop.tray === drag.tray && diff >= 0 && diff <= 1) {
				if (drop.tray !== 't0') {
					spaceTile(id, drag.id, clientX > startX);
				}
			} else {
				if (drag.tray === 't0' && drop.tray === 't0') {

				} else {
					moveTile(id, drag.id, drop.tray, drop.index);
				}
			}

			this.setState({
				drag: undefined,
				drop: undefined
			});
		}
	}

	private onClick({ target, shiftKey }: React.MouseEvent) {
		const { id, toggleTileHidden } = this.props;
		const { classList, id: tileId } = target as HTMLElement;

		if (classList.contains('tile') && shiftKey) {
			toggleTileHidden(id, tileId);
		}
	}

	private onKeyUp(e: any) {
		if (e.key === 'Escape') {
			this.toggleMenu();
		}
	}

	private toggleReveal(chairId: string) {
		const { id, toggleReveal } = this.props;

		toggleReveal(id, chairId);
	}

	private hideMenu() {
		this.setState({ showMenu: false });
	}

	private toggleMenu() {
		const { showMenu } = this.state;
		this.setState({ showMenu: !showMenu });
	}

	private startNotificationTimer() {
		clearTimeout(this.timer);

		this.timer = setTimeout(() => {
			this.setState({ notification: undefined });
		}, 5000);

		this.setState({ startTimer: false });
	}

	render() {
		const { table, leave } = this.props;
		const { notification, showMenu, drag } = this.state;

		if (!table) {
			return null;
		}

		const { player } = this.props;
		const { game: { tiles, x }, chairs } = table;
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
								reveal={ this.toggleReveal }
								tiles={ tiles }
								transit={ table.transit }
								table={ table }
							/>
						))
				}
				{/* <Exit onClick={ () => leave(table.id, chairs[p].id) } /> */}
				<Center
					tiles={ tiles }
					transit={ table.transit }
					padding={ x }
				/>
				{/* <Wall tiles={ tiles } begin={ true } x={ drag != null } />
				<Wall tiles={ tiles } begin={ false }  x={ drag != null } /> */}
				{/* <div className="corner corner-top corner-left" />
				<div className="corner corner-top corner-right" />
				<div className="corner corner-bottom corner-left" />
				<div className="corner corner-bottom corner-right" /> */}
				{
					showMenu
						? (
							<Menu
								close={ this.hideMenu }
								table={ table }
								chair={ chairs[p].id }
							/>
						)
						: null
				}
				<Notifications table={ table } notification={ notification } />
			</div>
		);
	}
};

const mapStateToProps = (state: Mahjong.Store): MappedProps => {
	return {
		player: selectUserName(state),
		id: selectActiveTableId(state),
		table: selectActiveTable(state)
	};
};

const mapDispatchToProps = (dispatch: any): DispatchProps => {
	return {
		moveTile(tableId: string, tileId: string, tray: string, index: number) {
			dispatch(ActionMoveTile.create(tableId, tileId, tray, index));
		},

		spaceTile(tableId: string, tileId: string, spaced: boolean) {
			dispatch(ActionSpaceTile.create(tableId, tileId, spaced));
		},

		toggleTileHidden(tableId: string, tileId: string) {
			dispatch(ActionToggleTileHidden.create(tableId, tileId));
		},

		setSeated(tableId: string, chairId: string, seated: boolean) {
			dispatch(ActionSpaceTile.create(tableId, chairId, seated));
		},

		toggleReveal(tableId: string, chairId: string) {
			dispatch(ActionToggleReveal.create(tableId, chairId));
		},

		leave(tableId: string, chairId: string) {
			dispatch(ActionSetActiveTable.create());
			dispatch(ActionSetSeated.create(tableId, chairId, false));
		},
	};
};

export const Table = connect(mapStateToProps, mapDispatchToProps)(_Table);
