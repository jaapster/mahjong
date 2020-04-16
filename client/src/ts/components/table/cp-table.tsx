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
	ActionSetActiveTable,
	ActionSetTileHidden,
	ActionRevealTiles,
	ActionSetTransit,
	ActionNewGame
} from '../../store/actions/actions';
import {
	selectUserName,
	selectActiveTableId
} from '../../store/selectors/selectors';

import './ss-table.scss';

interface Props {
	id: string;
	player: string;
	leave(): void;
	moveTile(tableId: string, tileId: string, tray: string, index: number): void;
	spaceTile(tableId: string, tileId: string, spaced: boolean): void;
	setSeated(tableId: string, chairId: string, seated: boolean): void;
	hideTile(tableId: string, tileId: string, hidden: boolean): void;
	reveal(tableId: string, chairId: string, reveal: boolean): void;
	setTransit(tableId: string, transit: boolean): void;
	startNewGame(tableId: string): void;
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
	private readonly stream: EventSource;
	private timeout: any;

	constructor(props: Props) {
		super(props);

		const { id } = props;

		this.state = {
			startX: 0,
			chairs: {},
			showMenu: false
		};

		this.stream = new EventSource(`/streams/tables/${ id }`);
		this.stream.addEventListener('update', this.onUpdate);
		this.stream.addEventListener('initial', this.onInitial);
		this.stream.addEventListener('delete', this.onDelete);
		this.stream.addEventListener('tile-move', this.onTileMove);
	}

	componentDidMount() {
		document.addEventListener('keyup', this.onKeyUp);
	}

	componentWillUnmount() {
		this.stream.removeEventListener('update', this.onUpdate);
		this.stream.removeEventListener('delete', this.onDelete);
		this.stream.removeEventListener('tile-move', this.onTileMove);
		this.stream.close();

		document.removeEventListener('keyup', this.onKeyUp);
	}

	private onInitial(event) {
		const { id, player, setSeated } = this.props;
		const table = JSON.parse(event.data);

		const chair = table.chairs.find(chair => chair.player === player);

		if (chair != null) {
			setSeated(id, chair.id, true);

			window.onbeforeunload = () => setSeated(id, chair.id, false);
		}

		this.setState({
			table,
			chairs: table.chairs.reduce((m, c) => (
				{
					...m,
					[c.id]: c.player
				}
			), {})
		});
	}

	private onUpdate(event) {
		this.setState({ table: JSON.parse(event.data) });
	}

	private onDelete() {
		console.warn('OMG, This table was deleted!');
	}

	private onTileMove(event) {
		const { tile, from, to } = JSON.parse(event.data);

		if (from !== to) {
			let str;
			// const { player } = this.props;
			const { table, chairs } = this.state;

			// if (trayMap[from[0]] !== player && trayMap[to[0]] !== player) {
				const { title } = table.game.tiles.find(t => t.id === tile);

				if (from === 't0') {
					str = `${ chairs[to[0]] ?? 'Een dummy' } pakt een steen van de muur`;
				} else if (to === 't0') {
					str = `${ chairs[from[0]] ?? 'Een dummy' } legt een steen op de muur`;
				} else if (from === 't1') {
					str = `${ chairs[to] ?? 'Een dummy' } pakt een "${ title }" van de tafel`;
				} else if (to === 't1') {
					str = `${ chairs[from[0]] ?? 'Een dummy' } legt een "${ title }" op de tafel`;
				}

				this.setState({ notification: str });

				clearTimeout(this.timeout);

				this.timeout = setTimeout(() => this.setState({ notification: undefined }), 5000);
			// }
		}
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
		const { hideTile } = this.props;
		const { dataset, classList, id: tileId } = target as HTMLElement;

		if (classList.contains('tile') && shiftKey) {
			const { id } = this.props;

			hideTile(id, tileId, dataset.hidden === 'false');
		}
	}

	private reveal(chairId: string) {
		const { id, reveal } = this.props;
		const { table } = this.state;

		const chair = table.chairs.find(chair => chair.id === chairId);

		reveal(id, chairId, !chair.reveal);
	}

	private toggleTransitMode() {
		const { id, setTransit } = this.props;
		const { table } = this.state;

		setTransit(id, !table.transit);
	}

	private onKeyUp(e: any) {
		if (e.key === 'Escape') {
			this.toggleMenu();
		}
	}

	private startNewGame() {
		const { id, startNewGame } = this.props;
		startNewGame(id);
	}

	private hideMenu() {
		this.setState({ showMenu: false });
	}

	private toggleMenu() {
		const { showMenu } = this.state;
		this.setState({ showMenu: !showMenu });
	}

	render() {
		const { leave } = this.props;
		const { table, notification, showMenu } = this.state;

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
								reveal={ this.reveal }
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
								leaveTable={ leave }
								startNewGame={ this.startNewGame }
								table={ table }
								toggleTransitMode={ this.toggleTransitMode }
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
		id: selectActiveTableId(state)
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

		setSeated(tableId: string, chairId: string, seated: boolean) {
			dispatch(ActionSpaceTile.create(tableId, chairId, seated));
		},

		leave() {
			dispatch(ActionSetActiveTable.create({ id: undefined }));
		},

		hideTile(tableId: string, tileId: string, hidden: boolean) {
			dispatch(ActionSetTileHidden.create(tableId, tileId, hidden));
		},

		reveal(tableId: string, chairId: string, reveal: boolean) {
			dispatch(ActionRevealTiles.create(tableId, chairId, reveal));
		},

		setTransit(tableId: string, transit: boolean) {
			dispatch(ActionSetTransit.create(tableId, transit));
		},

		startNewGame(tableId: string) {
			dispatch(ActionNewGame.create(tableId));
		}
	};
};

export const Table = connect(mapStateToProps, mapDispatchToProps)(_Table);
