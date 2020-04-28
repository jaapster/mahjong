import React from 'react';
import bind from 'autobind-decorator';
import { mergeClasses } from '../../utils/util-merge-classes';
import { Tray } from './cp-tray';
import { getTray } from '../../utils/util-get-tray';
import { Portal } from '../app/cp-portal';
import './ss-chair.scss';
import { ActionMoveTile, ActionSpaceTile } from '../../store/actions/actions';
import { connect } from 'react-redux';
import { analyseHand } from './ai/ai';

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

@bind
export class _Chair extends React.Component<Props & DispatchProps> {
	componentDidMount() {
		// todo: this is done to ensure that 'transit-area' is in the DOM
		this.forceUpdate();
	}

	private autoPlay() {
		const { chair: { id }, table, tiles, moveTile } = this.props;

		const { move, discard, take } = analyseHand(
			getTray(`${ id }0`, tiles),
			getTray('t1', tiles)[0],
			getTray('t0', tiles)[0]
		);

		if (move != null) {
			move.forEach(t => moveTile(table.id, t.id, `${ id }1`, -0.5));
		}

		if (take != null) {
			moveTile(table.id, take.id, `${ id }0`, -0.5);
		}

		moveTile(table.id, discard.id, 't1', -0.5);
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
								{ chair.player ?? 'leeg' }
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