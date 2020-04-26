import React from 'react';
import bind from 'autobind-decorator';
import { mergeClasses } from '../../utils/util-merge-classes';
import { Tray } from './cp-tray';
import { getTray } from '../../utils/util-get-tray';
import { Portal } from '../app/cp-portal';
import './ss-chair.scss';
import { ActionMoveTile, ActionSpaceTile } from '../../store/actions/actions';
import { connect } from 'react-redux';

interface Props {
	chair: Mahjong.Chair;
	index: number;
	tiles: Mahjong.Tile[];
	transit: boolean;
	reveal(id: string): void;
	player: string;
	table: Mahjong.Table;
}

interface DispatchProps {
	moveTile(tableId: string, tileId: string, tray: string, index: number): void;
	spaceTile(tableId: string, tileId: string): void;
}

const POSITIONS = ['player', 'left', 'top', 'right'];

const findChows = (r: Mahjong.Tile[]) => {
	let tiles = r.map(t => ({ ...t, u: false }));

	// let unused = tiles.length;
	let sets = [];

	tiles.forEach(t => {
		if (['dots', 'bamboo', 'characters'].includes(t.suit)) {
			const number = parseInt(t.name);
			const { suit } = t;

			if (number > 1 && number < 9) {
				const left = tiles.find(t => t.suit === suit && parseInt(t.name) + 1 === number);
				const right = tiles.find(t => t.suit === suit && parseInt(t.name) - 1 === number);

				if (left && right) {
					t.u = true;
					left.u = true;
					right.u = true;

					sets.push([t, left, right]);
				}
			}
		}
	});

	return sets;
};

@bind
export class _Chair extends React.Component<Props & DispatchProps> {
	componentDidMount() {
		// todo: this is done to ensure that 'transit-area' is in the DOM
		this.forceUpdate();
	}

	private autoPlay() {
		return;
		// const {
		// 	chair: {
		// 		id
		// 	},
		// 	index,
		// 	tiles,
		// 	// reveal,
		// 	table,
		// 	moveTile,
		// 	spaceTile
		// } = this.props;

		// const rack = getTray(`${ id }0`, tiles);
		// // const open = getTray(`${ id }1`, tiles);
		// const wall = getTray('t0', tiles);
		// const last = getTray('t1', tiles)[0];

		// // find all possibel chows using tiles on rack and free tile on the table
		// const rackChows = findChows(rack);
		// const chows = findChows(rack.concat(last));

		// // check if there is a chow using the free tile on the table
		// const chowUsingLast = chows.find(c => c.find(t => t.id === last?.id ?? null));

		// if (chowUsingLast != null) {
		// 	// use the free tile on the table: move the chow containing the free tile to the
		// 	// players "public" tray
		// 	chowUsingLast.sort((a, b) => a.name > b.name ? 1 : -1).forEach((t, i) => {
		// 		moveTile(table.id, t.id, `${ id }1`, -0.5);

		// 		if (i === 2) {
		// 			spaceTile(table.id, t.id);
		// 		}
		// 	});
		// } else {
		// 	// get tile from wall
		// 	moveTile(table.id, wall[0].id, `${ id }0`, -0.5);
		// }
		// setTimeout(() => {
		// 	// put tile on table
		// 	moveTile(table.id, rack[0].id, 't1', 0);
		// }, 500);
	}

	render() {
		const { chair: { id }, chair, index, tiles, reveal, transit, player } = this.props;

		const isPlayer = index === 0 || player === 'zork';
		const isDummy = chair.player == null;

		const set0 = getTray(`${ id }0`, tiles);
		const set1 = getTray(`${ id }1`, tiles);
		const rotate = index === 1 ? -90 : index === 3 ? 90 : 0;

		const total = set0.length + set1.length;

		return (
			<div className={ mergeClasses(
					'chair',
					`chair-${ POSITIONS[index] }`,
					`chair-${ id }`,
					{
						'chair-exceeds': total > 13
					}
				) }>
				<div className="trays">
					<Tray
						draggable={ isPlayer || isDummy }
						hidden={ !isPlayer && !chair.reveal }
						id={ (isPlayer || isDummy) ? `${ id }0` : undefined }
						rotate={ rotate }
						showCount
						small={ false }
						tiles={ set0 }
					/>
					<Tray
						draggable={ isPlayer }
						hidden={ false }
						id={ isPlayer ? `${ id }1` : undefined }
						rotate={ rotate }
						showCount
						small={ false }
						tiles={ set1 }
					/>
				</div>
				{
					!isPlayer
						? (
							<div
								onClick={ this.autoPlay }
								className={
									mergeClasses(
										'player',
										{
											'player-unseated': !chair.seated
										}
									)
								}
							>
								{ chair.player }
							</div>
						)
						: null
				}
				{
					index === 0
						? (
							<>
								<div
									className={ mergeClasses(
										'tray-visibility',
										{
											'tray-visible': chair.reveal
										}
									) }
									onClick={
										index === 0
											? () => reveal(id)
											: undefined
									}
									title={
										chair.reveal
											? 'Verberg'
											: 'Maak zichtbaar voor iedereen'
									}
								>
									{
										chair.reveal
											? 'Zichtbaar'
											: 'Verborgen'
									}
								</div>
								<div className="tile-counter">
									{ set0.length + set1.length }
								</div>
							</>
						)
						: null
				}
				{
					transit
						? (
							<Portal id="transit-area">
								<div className={ mergeClasses(
										'transit',
										`transit-${ index }`
									) }>
									<Tray
										id={isPlayer || isDummy ? `${ id }transit` : undefined }
										hidden={ true }
										tiles={ getTray(`${ id }transit`, tiles) }
										rotate={ 0 }
										small={ false }
										draggable={ true }
									/>
								</div>
							</Portal>
						)
						: null
				}
			</div>
		);
	}
};

const mapDispatchToProps = (dispatch: any): DispatchProps => {
	return {
		moveTile(tableId: string, tileId: string, tray: string, index: number) {
			dispatch(ActionMoveTile.create(tableId, tileId, tray, index));
		},

		spaceTile(tableId: string, tileId: string) {
			dispatch(ActionSpaceTile.create(tableId, tileId, true));
		}
	};
};

export const Chair = connect(null, mapDispatchToProps)(_Chair);