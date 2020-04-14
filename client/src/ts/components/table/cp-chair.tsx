import React from 'react';
import { mergeClasses } from '../../utils/util-merge-classes';
import { Tray } from './cp-tray';
import { getTray } from '../../utils/util-get-tray';
import { Portal } from '../app/cp-portal';
import './ss-chair.scss';

interface Props {
	chair: Mahjong.Chair;
	index: number;
	tiles: Mahjong.Tile[];
	transit: boolean;
	reveal(id: string): void;
	player: string;
}

const POSITIONS = ['player', 'left', 'top', 'right'];

export class Chair extends React.Component<Props> {
	componentDidMount() {
		// todo: this is done to ensure that 'transit-area' is in the DOM
		this.forceUpdate();
	}

	render() {
		const { chair: { id }, chair, index, tiles, reveal, transit, player } = this.props;

		const isPlayer = index === 0 || player === 'zork';
		const isDummy = chair.player == null;

		const set0 = getTray(`${ id }0`, tiles);
		const set1 = getTray(`${ id }1`, tiles);
		const rotate = index === 1 || index === 3;

		const total = set0.length + set1.length;

		return (
			<div className={ mergeClasses(
					'chair',
					`chair-${ POSITIONS[index] }`,
					`chair-${ id }`
				) }>
				<Tray
					draggable={ isPlayer || isDummy }
					hidden={ !isPlayer && !chair.reveal }
					id={ (isPlayer || isDummy) ? `${ id }0` : undefined }
					rotate={ rotate }
					showCount
					small={ !isPlayer && !chair.reveal }
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
				<div
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
				{
					index === 0
						? (
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
										rotate={ index === 1 || index === 3 }
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
