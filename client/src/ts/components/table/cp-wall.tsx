import React from 'react';
import { Tray } from './cp-tray';
import { getTray } from '../../utils/util-get-tray';
import './ss-wall.scss';
import { mergeClasses } from '../../utils/util-merge-classes';

interface Props {
	tiles: Mahjong.Tile[];
	begin: boolean;
}

export const Wall = ({ tiles, begin }: Props) => {
	const list = getTray('t0', tiles);
	const count = list.length;
	const tile = begin
		? list[0]
		: list[count - 1];

	return (
		<div className={ mergeClasses('wall', { 'wall-begin': begin, 'wall-end': !begin })}>
			<Tray
				id={ `t0-${ begin ? 'begin' : 'end' }` }
				hidden={ false }
				tiles={ tile ? [tile] : [] }
				blank={ true }
				small={ false }
				draggable={ true }
			/>
			<div className="tile-count">
				{ count }
			</div>
		</div>
	);
};
