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

		return (
			<div className={ mergeClasses(
					'chair',
					`chair-${ POSITIONS[index] }`,
					`chair-${ id }`
				) }>
				<Tray
					id={ `${ id }0` }
					hidden={ index > 0 && !chair.reveal }
					tiles={ getTray(`${ id }0`, tiles) }
					rotate={ index === 1 || index === 3 }
					small={ index > 0 && !chair.reveal }
					draggable={ index === 0 }
				/>
				<Tray
					id={ `${ id }1` }
					hidden={ false }
					tiles={ getTray(`${ id }1`, tiles) }
					rotate={ index === 1 || index === 3 }
					small={ false }
					draggable={ index === 0 }
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
					onClick={ () => reveal(id) }
				>
					{ chair.player }
				</div>
				{
					transit
						? (
							<Portal id="transit-area">
								<div className={ mergeClasses(
										'transit',
										`transit-${ index }`
									) }>
									<Tray
										id={ `${ id }transit` }
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
