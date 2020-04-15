import React from 'react';
import { getTray } from '../../utils/util-get-tray';
import { mergeClasses } from '../../utils/util-merge-classes';
import { Tray } from './cp-tray';

import './ss-wall.scss';

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
		<div
			className={
				mergeClasses(
					'wall',
					{
						'wall-begin': begin,
						'wall-end': !begin
					}
				)
			}
		>
			<Tray
				blank={ true }
				draggable={ true }
				hidden={ false }
				id="t0"
				small={ false }
				tiles={ tile ? [tile] : [] }
			/>
			<div className="tile-count">
				{ count }
			</div>
		</div>
	);
};
