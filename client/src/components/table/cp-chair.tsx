import React from 'react';
import { mergeClasses } from '../../utils/util-merge-classes';
import './cp-chair.scss';
import { Tray } from './cp-tray';
import { getTray } from '../../utils/util-get-tray';

interface Props {
	chair: Mahjong.Chair;
	index: number;
	tiles: Mahjong.Tile[];
}

const POSITIONS = ['player', 'left', 'top', 'right'];

export const Chair = ({ chair, index, tiles }: Props) => {
	return (
		<div className={ mergeClasses('chair', `chair-${ POSITIONS[index] }`)}>
			<Tray
				id={ `${ chair.id }0` }
				hidden={ index > 0 }
				tiles={ getTray(`${ chair.id }0`, tiles) }
				rotate={ index === 1 || index === 3 }
			/>
			<Tray
				id={ `${ chair.id }1` }
				hidden={ false }
				tiles={ getTray(`${ chair.id }1`, tiles) }
				rotate={ index === 1 || index === 3 }
			/>
			<div className="player-name">{ chair.player }</div>
		</div>
	);
};
