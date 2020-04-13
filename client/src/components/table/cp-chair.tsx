import React from 'react';
import { mergeClasses } from '../../utils/util-merge-classes';
import { Tray } from './cp-tray';
import { getTray } from '../../utils/util-get-tray';
import { Portal } from '../app/cp-portal';
import './cp-chair.scss';

interface Props {
	chair: Mahjong.Chair;
	index: number;
	tiles: Mahjong.Tile[];
	transit: boolean;
	reveal(id: string): void;
}

const POSITIONS = ['player', 'left', 'top', 'right'];

export class Chair extends React.Component<Props> {
	componentDidMount() {
		// todo: this is done to ensure that 'transit-area' is in the DOM
		this.forceUpdate();
	}

	render() {
		const { chair: { id }, chair, index, tiles, reveal, transit } = this.props;

		console.log('transit', transit);

		const isPlayer = index === 0;
		const isDummy = chair.player == null;

		return (
			<div className={ mergeClasses(
					'chair',
					`chair-${ POSITIONS[index] }`,
					`chair-${ id }`
				) }>
				<Tray
					id={ (isPlayer || isDummy) ? `${ id }0` : undefined }
					hidden={ !isPlayer && !chair.reveal }
					tiles={ getTray(`${ id }0`, tiles) }
					rotate={ index === 1 || index === 3 }
					small={ !isPlayer && !chair.reveal }
					draggable={ isPlayer || isDummy }
					showCount
				/>
				<Tray
					id={ isPlayer ? `${ id }1` : undefined }
					hidden={ false }
					tiles={ getTray(`${ id }1`, tiles) }
					rotate={ index === 1 || index === 3 }
					small={ false }
					draggable={ isPlayer }
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
										id={ index === 0 ? `${ id }transit` : undefined }
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
